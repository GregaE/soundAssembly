const axios = require('axios');
const Account = require('../model/accountSchema.js');

const access_token = "BQBqzDnoyYZ8lbpUVTHsRGtodXBcgR5xI48NMPrYPo5KhB2vhPEk0QofZ8tH5L1fNpOEhtMml8Mu16aT8fzjzvgMmoNCHzKBbtpGluVxsN7vMFYL69M61Y4alBo27UoEIjAVMLYtkuIQWj4_4MSEdJy_"; // static token before full authorization module is complete

exports.getArtists = async (req, res) => {
  try {
    const response = await axios('https://api.spotify.com/v1/me/following?type=artist&limit=5', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    });
    const followedArtists = response.data.artists.items;
    const event = await Account.create({account: followedArtists})
    res.send(response.data.artists.items);
  } catch (error) {
      console.error(error);
      res.status(500);
  }
}