const pokerAPI = require('../lib/poker-api');

module.exports = async (req, res) => {
  try {
    const api = await pokerAPI({
      command: 'SystemStats'
    });

    res.render('system-stats', api);
  } catch (error) {
    res.render('system-stats', { error });
  }
};
