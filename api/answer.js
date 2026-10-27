const { arenaConfig, json, requireAdmin, getState, findScenario } = require('../lib/arena.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Use GET.' });
  if (!requireAdmin(req, res)) return;
  try {
    const state = await getState();
    if (!state.active) return json(res, 409, { error: 'No active scenario.' });
    const scenario = findScenario(state.active.classId, state.active.scenarioId);
    return json(res, 200, {
      title: scenario.title, answerKey: scenario.answerKey,
      ruleChanger: scenario.ruleChanger, organiserNotes: scenario.organiserNotes
    });
  } catch (error) {
    return json(res, 503, { error: error.message || 'Unable to load the answer key.' });
  }
};

