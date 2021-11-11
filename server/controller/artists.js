const axios = require('axios');
const Account = require('../model/accountSchema.js');

const access_token = "BQAgIkH0nrohr_-4MzORRbVjSZw2VTk0UnVCykCHqPxYo0qzUiWmipOJLF_i66fO1w4sXLn_f4j4kVU-naFUsOt0hgBjfImZ-DnBc-kRhiubbx0nHyhQDvlD74G2Bu9Z0RQ2lZJMupKxn82bYlRmA_WVx3qMfdCbXE6tnw"; // static token before full authorization module is complete

exports.getArtists = async (req, res) => {
  // TO DO:
  // if account created, just update the existing list
  try {
    // fetch followed artists for the specific account
    const artistFetch = await fetchArtists();
    const followedArtists = artistFetch.data.artists.items;
    // fetch profile id for the specific account
    const profileData = await fetchProfile();
    const username = profileData.data.id;
    // create account with followed artists in the DB
    const event = await Account.create({username: username, artists: followedArtists})
    res.send(event);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

function fetchArtists(req, res) {
  const response = axios('https://api.spotify.com/v1/me/following?type=artist&limit=5', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
  });
  return response
}

function fetchProfile (req, res) {
  const response = axios('https://api.spotify.com/v1/me', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
  });
  return response
}

