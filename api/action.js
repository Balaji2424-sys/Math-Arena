const { json, readJson, requireAdmin, mutate, publicSnapshot } = require('../lib/arena.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Use POST.' });
  if (!requireAdmin(req, res)) return;
  try {
    const body = await readJson(req);
    const allowed = ['advance', 'complete', 'rule', 'resetChallenge', 'release', 'resetHistory', 'timerStart', 'timerPause', 'timerReset'];
    if (!allowed.includes(body.action)) return json(res, 400, { error: 'Unknown arena action.' });
    const result = await mutate({
      action: body.action, stage: Number(body.stage), value: body.value === true,
      classId: String(body.classId || ''), duration: Math.max(60, Math.min(10800, Number(body.duration) || 300)),
      now: Date.now(), timestamp: new Date().toISOString()
    });
    const statuses = { NO_ACTIVE: 409, BUSY: 409, OUT_OF_ORDER: 409, BAD_ACTION: 400 };
    if (result.code !== 'OK') return json(res, statuses[result.code] || 409, { error: result.code === 'OUT_OF_ORDER' ? 'Reveal the cards in order.' : 'The arena state changed on another device. Refresh and try again.', state: result.state });
    return json(res, 200, await publicSnapshot(body.classId || result.state.active?.classId || 'class9'));
  } catch (error) {
    return json(res, 503, { error: error.message || 'Unable to update arena state.' });
  }
};

