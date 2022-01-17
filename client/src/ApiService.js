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
  return fetchRequest('/tryme')
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

async function getAlbums(artistId, req, res) {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
  });
  const albums = await response.json();
  return albums;
}

async function getUser(req, res) {
  console.log(sessionStorage.getItem('token'))
  const response = await fetch(`https://api.spotify.com/v1/me`, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
  });
  const albums = await response.json();
  return albums;
}

export { login, refresh, importLibrary, getLibrary, getAlbums, getArtist, createTag, tagArtist, untagArtist, getUser };