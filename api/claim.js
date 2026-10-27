const { arenaConfig, json, readJson, requireAdmin, mutate, publicSnapshot } = require('../lib/arena.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Use POST.' });
  if (!requireAdmin(req, res)) return;
  try {
    const body = await readJson(req);
    const cfg = arenaConfig.classes[body.classId];
    const scenario = cfg?.enabled ? cfg.scenarios[Number(body.doorIndex) - 1] : null;
    if (!scenario) return json(res, 400, { error: 'That door is not configured.' });
    const result = await mutate({ action: 'claim', classId: body.classId, scenarioId: scenario.id, doorIndex: Number(body.doorIndex), timestamp: new Date().toISOString() });
    if (result.code !== 'OK') return json(res, result.code === 'USED' ? 409 : 423, { error: result.code === 'USED' ? 'This door has already been used.' : 'Another door is already active. Reset or release it before choosing another.', state: result.state });
    return json(res, 200, await publicSnapshot(body.classId));
  } catch (error) {
    return json(res, 503, { error: error.message || 'Unable to claim that door.' });
  }
};

