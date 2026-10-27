const crypto = require('node:crypto');
const arenaConfig = require('./arena-data.js');

const STATE_KEY = `${process.env.ARENA_EVENT_ID || 'mathfest:event4'}:state`;

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.end(JSON.stringify(payload));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => { raw += chunk; if (raw.length > 12000) reject(new Error('Request too large')); });
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); }
      catch { reject(new Error('Request body must be JSON.')); }
    });
    req.on('error', reject);
  });
}

function authorized(req) {
  const expected = process.env.ARENA_ADMIN_TOKEN;
  const supplied = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!expected || !supplied) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(supplied);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function requireAdmin(req, res) {
  if (authorized(req)) return true;
  json(res, process.env.ARENA_ADMIN_TOKEN ? 401 : 503, {
    error: process.env.ARENA_ADMIN_TOKEN ? 'Organizer key required or invalid.' : 'ARENA_ADMIN_TOKEN is not configured.'
  });
  return false;
}

function defaultState() {
  return { active: null, stage: 0, complete: false, ruleVisible: false, used: {}, timerRemaining: 300, timerEndsAt: null, timerRunning: false, revision: 0, updatedAt: null };
}

async function redis(command) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error('Connect Upstash Redis and configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.');
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command)
  });
  const result = await response.json();
  if (!response.ok || result.error) throw new Error(result.error || `Redis request failed (${response.status}).`);
  return result.result;
}

async function getState() {
  const raw = await redis(['GET', STATE_KEY]);
  return raw ? JSON.parse(raw) : defaultState();
}

const MUTATION_LUA = `
local raw = redis.call('GET', KEYS[1])
local s = raw and cjson.decode(raw) or cjson.decode(ARGV[1])
local a = cjson.decode(ARGV[2])
local code = 'OK'
if a.action == 'claim' then
  if s.active and s.active ~= cjson.null then code = 'BUSY'
  else
    s.used = s.used or {}
    s.used[a.classId] = s.used[a.classId] or {}
    local already = false
    for _, id in ipairs(s.used[a.classId]) do if id == a.scenarioId then already = true end end
    if not a.allowRepeat and already then code = 'USED'
    else
      s.active = { classId = a.classId, scenarioId = a.scenarioId, doorIndex = a.doorIndex }
      if not already then table.insert(s.used[a.classId], a.scenarioId) end
      s.stage = 0; s.complete = false; s.ruleVisible = false
      s.timerRemaining = 300; s.timerEndsAt = cjson.null; s.timerRunning = false
    end
  end
elseif a.action == 'advance' then
  if not s.active or s.active == cjson.null then code = 'NO_ACTIVE'
  elseif a.stage < 1 or a.stage > 3 or a.stage > s.stage + 1 then code = 'OUT_OF_ORDER'
  elseif a.stage > s.stage then s.stage = a.stage end
elseif a.action == 'complete' then
  if not s.active or s.active == cjson.null then code = 'NO_ACTIVE' else s.complete = a.value == true end
elseif a.action == 'rule' then
  if not s.active or s.active == cjson.null then code = 'NO_ACTIVE' else s.ruleVisible = true end
elseif a.action == 'resetChallenge' then
  if not s.active or s.active == cjson.null then code = 'NO_ACTIVE'
  else s.stage = 0; s.complete = false; s.ruleVisible = false; s.timerRemaining = 300; s.timerEndsAt = cjson.null; s.timerRunning = false end
elseif a.action == 'release' then
  s.active = cjson.null; s.stage = 0; s.complete = false; s.ruleVisible = false; s.timerRemaining = 300; s.timerEndsAt = cjson.null; s.timerRunning = false
elseif a.action == 'resetHistory' then
  if s.active and s.active ~= cjson.null and s.active.classId == a.classId then code = 'BUSY'
  else s.used = s.used or {}; s.used[a.classId] = {} end
elseif a.action == 'timerStart' then
  if s.timerRunning and s.timerEndsAt and s.timerEndsAt ~= cjson.null and s.timerEndsAt <= a.now then s.timerRemaining = 0 end
  if not s.timerRunning or not s.timerEndsAt or s.timerEndsAt == cjson.null or s.timerEndsAt <= a.now then
    if (s.timerRemaining or 0) <= 0 then s.timerRemaining = a.duration end
    s.timerEndsAt = a.now + s.timerRemaining * 1000
    s.timerRunning = true
  end
elseif a.action == 'timerPause' then
  if s.timerRunning then s.timerRemaining = math.max(0, math.ceil((s.timerEndsAt - a.now) / 1000)) end
  s.timerEndsAt = cjson.null; s.timerRunning = false
elseif a.action == 'timerReset' then
  s.timerRemaining = a.duration; s.timerEndsAt = cjson.null; s.timerRunning = false
else code = 'BAD_ACTION' end
if code == 'OK' then s.revision = (s.revision or 0) + 1; s.updatedAt = a.timestamp end
redis.call('SET', KEYS[1], cjson.encode(s))
return cjson.encode({ code = code, state = s })
`;

async function mutate(action) {
  const result = await redis(['EVAL', MUTATION_LUA, '1', STATE_KEY, JSON.stringify(defaultState()), JSON.stringify({ ...action, allowRepeat: arenaConfig.allowRepeatScenarios })]);
  return typeof result === 'string' ? JSON.parse(result) : result;
}

function findScenario(classId, scenarioId) {
  const classConfig = arenaConfig.classes[classId];
  if (!classConfig?.enabled) return null;
  return classConfig.scenarios.find(item => item.id === scenarioId) || null;
}

async function publicSnapshot(classId) {
  const state = await getState();
  const classes = Object.entries(arenaConfig.classes).map(([id, item]) => ({ id, label: item.label, enabled: item.enabled && item.scenarios.length > 0, count: item.scenarios.length }));
  const active = state.active || null;
  const selectedClass = classId || active?.classId || 'class9';
  const cfg = arenaConfig.classes[selectedClass];
  if (!cfg) throw new Error('Unknown class.');
  const used = new Set(state.used?.[selectedClass] || []);
  const doors = cfg.scenarios.map((scenario, index) => {
    const isCurrent = active?.classId === selectedClass && active?.scenarioId === scenario.id;
    let status = 'available';
    if (active) status = isCurrent ? 'active' : 'busy';
    else if (!arenaConfig.allowRepeatScenarios && used.has(scenario.id)) status = 'used';
    const randomEligible = !used.has(scenario.id) || (
      arenaConfig.allowRepeatScenarios && arenaConfig.randomSelectionMode === 'all'
    );
    return { index: index + 1, status, randomEligible };
  });
  let challenge = null;
  if (active) {
    const scenario = findScenario(active.classId, active.scenarioId);
    if (!scenario) throw new Error('The active scenario ID is missing from the configured data.');
    challenge = {
      classId: active.classId, classLabel: arenaConfig.classes[active.classId].label,
      scenarioId: scenario.id, title: scenario.title, doorIndex: active.doorIndex,
      stage: state.stage || 0, complete: !!state.complete, ruleVisible: !!state.ruleVisible,
      cards: [scenario.card1, scenario.card2, scenario.card3].map((text, index) => (state.stage || 0) >= index + 1 ? text : null),
      options: (state.stage || 0) >= 3 ? (scenario.options || '') : '',
      ruleChanger: state.ruleVisible ? scenario.ruleChanger : null,
      revision: state.revision || 0
    };
  }
  let timerRemaining = state.timerRemaining ?? 300;
  if (state.timerRunning && state.timerEndsAt) timerRemaining = Math.max(0, Math.ceil((state.timerEndsAt - Date.now()) / 1000));
  const timer = { remaining: timerRemaining, running: !!state.timerRunning };
  if (timer.running && timer.remaining === 0) timer.running = false;
  return { classes, selectedClass, doors, active: challenge, timer, revision: state.revision || 0 };
}

module.exports = { arenaConfig, json, readJson, requireAdmin, redis, getState, mutate, publicSnapshot, findScenario };

