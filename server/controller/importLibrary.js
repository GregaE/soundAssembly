const axios = require('axios');
const Library = require('../model/librarySchema.js');

const access_token = "BQCUx7Y2sjcj3GR8LNSrQLPDcMFpWlvwx0od5Uv_HCrsFs6U2dtAP4ir3h-xzCCSBfHLIrk3tBMOydzGSP0EElO6u98GhJj5gL8eQ9L_AjGoWetFeFIYS62g0sQWIPYe2yklsTAOqD-nxloUc5Gl1xUntlM7Q6moNqgVqA"; // static token before full authorization module is complete

exports.importLibrary = async (req, res) => {
  // TO DO:
  // if account created, just update the existing list
  try {
    // fetch followed artists for the specific account
    const artistFetch = await fetchArtists();
    const followedArtists = artistFetch.data.artists.items;
    // add tags array to each artist pre-populating some tags based on the genre
    const taggedArtists = populateTags(followedArtists);
    console.log(taggedArtists)
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
