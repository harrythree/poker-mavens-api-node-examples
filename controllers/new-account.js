const pokerAPI = require('../lib/poker-api');

const baseUrl = process.env.POKER_MAVENS_URL; // set your url in .env
const avatarUrl = `${baseUrl}/Image?Name=Avatars`;
const avatarMax = 64; // number of avatars available
const avatarSize = 32; // use 32 in version 5, 48 in version 4

function get(req, res) {
  const avatars = [];

  for (let i = 0; i < avatarMax; i += 1) {
    const avatar = {
      style: `display: inline-block; width: ${avatarSize}px; height: ${avatarSize}px; background: url('${avatarUrl}') no-repeat -${(i * avatarSize)}px 0px;`,
      value: i + 1,
      checked: i === 0 ? 'checked' : ''
    };
    avatars.push(avatar);
  }

  res.render('new-account', { avatars });
};

async function post(req, res) {
  try {
    const {
      Password1,
      Password2,
      Player,
      RealName,
      Location,
      Email,
      Avatar,
      Gender
     } = req.body;

    if (Password1 !== Password2) {
      throw new Error('Password mismatch. Click Back Button to correct.');
    }

    const api = await pokerAPI({
      command: 'AccountsAdd',
      PW: Password1,
      Chat: 'Yes',
      Note: 'Account created via API',
      Player,
      RealName,
      Location,
      Email,
      Avatar,
      Gender
    });

    if (api.Result !== 'Ok') {
      throw new Error('Click Back Button to correct.');
    }

    const message = `Account successfully created for ${Player}`;

    res.render('new-account', { message });
  } catch (error) {
    res.render('new-account', { error });
  }
}

module.exports = { get, post };