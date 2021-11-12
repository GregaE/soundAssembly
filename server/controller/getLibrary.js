const axios = require('axios');
const Library = require('../model/librarySchema.js');
const getFollowedArtists = require('./artists');

const access_token = "BQAWUlMSP8IWAZmDO4V5mcUDyuXCsaS1bl7HqoaS5bsIQCVDHjtvqkBL5F-txCWkc8UUe8ZYB5ufTeiHPEc8XlpTdCDitvVziZ5jugB9UqrSuVfObpcUXa7gtRUaVkvhkc69XymRX83L0t08wE6odRh5bwP8rLrZxCj9wQ"; // static token before full authorization module is complete

exports.getLibrary = async (req, res) => {
  try {
    const artistFetch = await Library.find({username: "mavienajera"});
    res.send(artistFetch);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}


exports.importLibrary = async (req, res) => {
  // TO DO:
  // if account created, just update the existing list
  try {
    // fetch followed artists for the specific account
    const artistFetch = await fetchArtists();
    const followedArtists = artistFetch.data.artists.items;
    // add tags array to each artist pre-populating some tags based on the genre
    const taggedArtists = populateTags(followedArtists);
    // fetch profile id for the specific account
    const profileData = await fetchProfile();
    const username = profileData.data.id;
    // create account with followed artists in the DB
    const event = await Library.create({username: username, artists: taggedArtists})
    res.send(event);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Spotify API calls

function fetchArtists(req, res) {
  const response = axios('https://api.spotify.com/v1/me/following?type=artist&limit=20', {
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

// Helper functions

function populateTags(artistList) {

  for (const artist in artistList) {
    const tags = [];

    if (artistList[artist].genres.some(genre => genre.includes("rock"))) {
      tags.push("rock")
    }
    if (artistList[artist].genres.some(genre => (genre.includes("rap") || genre.includes("hip hop")))) {
      tags.push("hip-hop")
    }
    if (artistList[artist].genres.some(genre => genre.includes("metal"))) {
      tags.push("metal")
    }
    if (artistList[artist].genres.some(genre => genre.includes("punk"))) {
      tags.push("punk")
    }
    if (artistList[artist].genres.some(genre => genre.includes("jazz"))) {
      tags.push("jazz")
    }
    if (artistList[artist].genres.some(genre => (genre.includes("edm") || genre.includes("idm") || genre.includes("electro") || genre.includes("electronic")))) {
      tags.push("electronic")
    }

    artistList[artist].tags = tags;
  }

  return artistList
}
