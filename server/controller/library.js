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
    const library = await fetchFollowedArtists(accessToken, 'https://api.spotify.com/v1/me/following?type=artist');
    const total = library.data.artists.total;
    let start = library.data.artists.next
    let loadedArtists = library.data.artists.items;
    while (loadedArtists.length < total) {
      const artists = await fetchFollowedArtists(accessToken, start);
      start = artists.data.artists.next;
      loadedArtists.push(...artists.data.artists.items)
    }
    const account = await Library.find({username: req.params.username});
    if (account.length) {
      const newArtists = loadedArtists
        .filter(artist => !account[0].artists
          .some(existingArtist => existingArtist.id === artist.id));
      const { artistList, tags} = populateTags(newArtists);
      const existingTags = account[0].tags.map((tag) => tag.name);
      const newTags = tags.filter(tag => !existingTags.includes(tag.name));
      const event = await Library.findOneAndUpdate({username: req.params.username}, {
          $push: {
            "artists": {$each: artistList}
          },
          $addToSet: {
            "tags": {$each: newTags}
          },
        },
        {
          new: true
        }
      )
      res.send(event);
    } else {
      const taggedArtists = await populateTags(loadedArtists);
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
  const tags = [];
  for (const artist in artistList) {
    const artistTags = [];

    const genreList = ["rock","metal","punk","jazz","ska","reggae","hip hop","EDM","indie", "country"]

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
