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

const importLibrary = (accessToken, username) => {
  return fetchRequest(`/importLibrary/${username}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({accessToken: accessToken})
  })
}

// Fetch existing list of followed artists and tags from db

const getLibrary = (username) => {
  return fetchRequest(`/getLibrary/${username}`)
}

const getArtist = (artistId, username) => {
  return fetchRequest(`/artists/${artistId}/${username}`)
}

// Tag management

const createTag = (tagName, username) => {
  return fetchRequest(`/tags/${username}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name: tagName})
  })
}

const tagArtist = (artistId, tagName, username) => {
  return fetchRequest(`/tags/add/${artistId}/${username}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name: tagName})
  })
}

const untagArtist = (artistId, tagName, username) => {
  return fetchRequest(`/tags/remove/${artistId}/${username}`, {
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