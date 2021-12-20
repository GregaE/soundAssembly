import axios from "axios";

// DB requests

const base_url = process.env.REACT_APP_SERVER_URL

function fetchRequest (path, options) {
  return fetch(base_url + path, options)
    .then(res => res.status < 400 ? res : Promise.reject())
    .then(res => res.status !== 204 ? res.json(): res)
    .catch(err => {
      console.error("Error: ", err);
    })
}

// Spotify OAuth

async function login (code) {
  const res = await axios
    .post(base_url + '/login', {
      code,
    });
  return res.data
}

async function refresh (refreshToken) {
  const res = await axios
    .post(base_url + '/refresh', {
      refreshToken,
    });
  return res.data
}

// Import/refresh library via Spotify

const importLibrary = () => {
  return fetchRequest('/importLibrary')
}

// Fetch existing list of followed artists and tags from db

const getLibrary = () => {
  return fetchRequest('/getLibrary')
}

const getArtist = (artistId) => {
  return fetchRequest(`/artists/${artistId}`)
}

// Create tag

const createTag = (tagName) => {
  return fetchRequest(`/tags`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name: tagName})
  })
}

// Add tag to artist

const tagArtist = (artistId, tagName) => {
  return fetchRequest(`/tags/add/${artistId}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name: tagName})
  })
}

// Remove tag from artist

const untagArtist = (artistId, tagName) => {
  return fetchRequest(`/tags/remove/${artistId}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name: tagName})
  })
}

// Requests directly to Spotify API

const access_token = "BQCOrfv3YDt6TAQ9mv3Ss99UPj0CEChLyrnzuv7mVDTRvF0tACDqc503h-HCe268H4EP4iJtaVTikA-T3NQ-LsJr_9au_LZ6utO35nf70HiQUZS7VCkaVIliZ-b7OP0Q-xm3XqXX9G_2K2V4PSsnduPWT3gWYrLmUqP5dtR6Dt_JETiW3i_ElO_ZioUIYn_TkdDnbkHDadSl5PycvGd5YG45c4GhkamU2cb0F-aGDBo";

async function getAlbums(artistId, req, res) {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
  });
  const albums = await response.json();
  return albums;
}

export { login, refresh, importLibrary, getLibrary, getAlbums, getArtist, createTag, tagArtist, untagArtist };