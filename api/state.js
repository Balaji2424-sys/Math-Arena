const { json, publicSnapshot } = require('../lib/arena.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return json(res, 405, { error: 'Use GET.' });
  try {
    const snapshot = await publicSnapshot(String(req.query.classId || 'class9'));
    return json(res, 200, snapshot);
  } catch (error) {
    return json(res, 503, { error: error.message || 'Unable to load arena state.' });
  }
};

