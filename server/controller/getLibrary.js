const axios = require('axios');
const Library = require('../model/librarySchema.js');

const access_token = "BQCh1FOA02r-TIe5qovEtXO1n2P3hAxNnkplvh4PMYRFZnMY1vfEZgKSLJqhCUCRfZPJ31ORdEzlNiqiSSz38Kjx6bSv9IWWNbnRXiudYlJv4mbnAym4gIQ7VI5FqFlpnRWAgahaEib2x1A1wvohwktNJieWfFAKD1da8g"; // static token before full authorization module is complete

// Fetch existing library from db

exports.getLibrary = async (req, res) => {
  try {
    const artistFetch = await Library.find({username: "mavienajera"});
    res.send(artistFetch);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Fetch list of items from API and send them to db

exports.importLibrary = async (req, res) => {
  try {
    // fetch followed artists for the specific account
    const artistFetch = await fetchArtists();
    const followedArtists = artistFetch.data.artists.items;
    // add tags array to each artist pre-populating some tags based on the genre
    const taggedArtists = populateTags(followedArtists);
    // fetch profile id for the specific account
    const profileData = await fetchProfile();
    const username = profileData.data.id;
    console.log(taggedArtists)
    // create account with followed artists in the DB
    const event = await Library.create({username: username, tags: taggedArtists.tags, artists: taggedArtists.artistList})
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
  // All existing tags on account
  const tags = [];

  for (const artist in artistList) {
    // All tags on the specific artist
    const artistTags = [];

    // List of genres for filtering
    const genreList = ["rock","metal","punk","jazz","ska","reggae","hip hop","EDM"]

    genreList.forEach(item => {
      if (artistList[artist].genres.some(genre => genre.includes(item))) {
        artistTags.push({name: item});
        console.log(tags)
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
