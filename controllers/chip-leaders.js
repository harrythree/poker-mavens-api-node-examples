const pokerAPI = require('../lib/poker-api');

const topcount = 10;  // display top 10, use any number you like

module.exports = async (req, res) => {
  try {
    // Fetch the Site Name using the SystemGet API command.

    const systemAPI = await pokerAPI({
      command: 'SystemGet',
      property: 'SiteName'
    });

    const sitename = systemAPI.Value;

    // Fetch the list of players using the AccountsList API command.

    const accountsAPI = await pokerAPI({
      command: 'AccountsList',
      fields: 'Player,Balance'
    });

    // Iterate through the players in the response and create a associative
    // chips array keyed on player name.

    const accounts = accountsAPI.Accounts;
    const chips = [];

    // Since Handlebars does not have a break function in their templates
    // I added the array length as topcount to replace this line in the original example
    // if ($rank == $topcount) break;

    for (let i = 0; i < topcount; i += 1) {
      const player = accountsAPI.Player[i];
      const balance = accountsAPI.Balance[i];
      const rank = i + 1
      chips.push({ rank, player, balance });
    }

    // Sort array in decending order.

    chips.sort((a, b) => b.balance - a.balance);

    // Display results in an html table.

    res.render('chip-leaders', { sitename, chips });
  } catch (error) {
    res.render('chip-leaders', { error });
  }
};