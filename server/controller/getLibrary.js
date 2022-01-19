const axios = require('axios');
const Library = require('../model/librarySchema.js');

const access_token = "BQCOrfv3YDt6TAQ9mv3Ss99UPj0CEChLyrnzuv7mVDTRvF0tACDqc503h-HCe268H4EP4iJtaVTikA-T3NQ-LsJr_9au_LZ6utO35nf70HiQUZS7VCkaVIliZ-b7OP0Q-xm3XqXX9G_2K2V4PSsnduPWT3gWYrLmUqP5dtR6Dt_JETiW3i_ElO_ZioUIYn_TkdDnbkHDadSl5PycvGd5YG45c4GhkamU2cb0F-aGDBo"; // static token before full authorization module is complete

// Fetch existing library from db

exports.getLibrary = async (req, res) => {
  try {
    const artistFetch = await Library.find({username: req.params.username});
    res.send(artistFetch);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Fetch list of items from API and send them to db

exports.importLibrary = async (req, res) => {
  try {
    const {accessToken} = req.body;
    // fetch followed artists for the specific account
    const artistFetch = await fetchArtists(accessToken);
    const followedArtists = artistFetch.data.artists.items;
    // add tags array to each artist pre-populating some tags based on the genre
    const taggedArtists = await populateTags(followedArtists);
    // create account with followed artists in the DB
    const event = await Library.create({username: req.params.username, tags: taggedArtists.tags, artists: taggedArtists.artistList})
    res.send(event);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Spotify API calls

function fetchArtists(token, req, res) {
  const response = axios('https://api.spotify.com/v1/me/following?type=artist&limit=50', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + token
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
  // All existing tags on account
  const tags = [];

  for (const artist in artistList) {
    // All tags on the specific artist
    const artistTags = [];

    // List of genres for filtering
    const genreList = ["rock","metal","punk","jazz","ska","reggae","hip hop","EDM","indie"]

    genreList.forEach(item => {
      if (artistList[artist].genres.some(genre => genre.includes(item))) {
        artistTags.push({name: item});
        if (!tags.some(tag => tag.name === item)) {
          tags.push({name: item})
        }
      }
    })
    // TO DO: improve genre logic -- example:
    // if (artistList[artist].genres.some(genre => (genre.includes("rap") || genre.includes("hip hop")))) {
    //   artistTags.push("hip-hop")
    // }

    // if (artistList[artist].genres.some(genre => (genre.includes("edm") || genre.includes("idm") || genre.includes("electro") || genre.includes("electronic")))) {
    //   artistTags.push("electronic")
    // }

    artistList[artist].artistTags = artistTags;
  }


  return {artistList: artistList, tags: tags}
}
