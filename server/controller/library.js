const axios = require('axios');
const Library = require('../model/librarySchema.js');

// Fetch existing library from db

exports.getLibrary = async (req, res) => {
  try {
    const library = await Library.find({username: req.params.username});
    res.send(library);
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
    const library = await fetchFollowedArtists(accessToken, 'https://api.spotify.com/v1/me/following?type=artist');
    const total = library.data.artists.total;
    let start = library.data.artists.next
    let loadedArtists = library.data.artists.items;
    // if the number of followed artists exceeds 50 continuously call the api to take into account pagination
    while (loadedArtists.length < total) {
      const artists = await fetchFollowedArtists(accessToken, start);
      start = artists.data.artists.next;
      loadedArtists.push(...artists.data.artists.items)
    }
    const account = await Library.find({username: req.params.username});
    // for existing accounts just add artists that were followed on Spotify since last load
    if (account.length > 0) {
      const newArtists = loadedArtists
        .filter(artist => !account[0].artists
          .some(existingArtist => existingArtist.id === artist.id));
      // add tags array to each artist pre-populating specific tags based on the genre
      const taggedNewArtists = await populateTags(newArtists);
      // update account with new followed artists in the DB
      const event = await Library.findOneAndUpdate({username: req.params.username}, {
          $push: {
            "artists": {$each: [...taggedNewArtists.artistList]}
          },
        },
        {
          new: true
        }
      )
      res.send(event);
    }
    else {
      // add tags array to each artist pre-populating specific tags based on the genre
      const taggedArtists = await populateTags(loadedArtists);
      // create account with followed artists in the DB
      const event = await Library.create({username: req.params.username, tags: taggedArtists.tags, artists: taggedArtists.artistList})
      res.send(event);
    }
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

// Spotify API calls

function fetchFollowedArtists(token, url, req, res) {
  const response = axios(url, {
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

    artistList[artist].artistTags = artistTags;
  }

  return {artistList: artistList, tags: tags}
}
