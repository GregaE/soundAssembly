// DB requests

const base_url = "http://localhost:8889"

function fetchRequest (path, options) {
  return fetch(base_url + path, options)
    .then(res => res.status < 400 ? res : Promise.reject())
    .then(res => res.status !== 204 ? res.json(): res)
    .catch(err => {
      console.error("Error: ", err);
    })
}

function authorize () {
  return fetchRequest('/login')
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

const access_token = "BQAGK_o6PW2kAj-6W82PowK_9jTnSNwandn5qkVnGjrjcKP4GEPuixp3C1h1eEMeOcUWt9sYZ0kaJIpQjKg8Fen-QNryX2IcQU31Ncn1qmlvvx8Q0pX-G34B-EW8mrSXsKPKOIloYiqkVLSKkKJ-k_PCYzA_52VSe8FmWw";

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

export { authorize, importLibrary, getLibrary, getAlbums, getArtist, createTag, tagArtist, untagArtist };