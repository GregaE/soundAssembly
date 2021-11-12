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

// Requests directly to Spotify API

const access_token = "BQAWUlMSP8IWAZmDO4V5mcUDyuXCsaS1bl7HqoaS5bsIQCVDHjtvqkBL5F-txCWkc8UUe8ZYB5ufTeiHPEc8XlpTdCDitvVziZ5jugB9UqrSuVfObpcUXa7gtRUaVkvhkc69XymRX83L0t08wE6odRh5bwP8rLrZxCj9wQ";

async function getArtist(artistId, req, res) {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
  });
  const details = await response.json();
  return details;
}

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



export { authorize, importLibrary, getLibrary, getAlbums, getArtist };