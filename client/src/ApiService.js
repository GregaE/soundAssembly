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

const getAccountInfo = () => {
  return fetchRequest('/artists')
}

// Requests directly to Spotify API

const access_token = "BQCAP2D4w1SF7fsRJppX9TB8OgcDeyd0CSdu6SQX0kTXFqCR6qHq2idMTrKKzXjnfaHJTrOSe_MxSyD1RPQuOgiQn9--50XkgvnOXZBP0CS_48jncyYOIprPAp8N86EP0SB0WZ_GLL2VDkgTjeswYOdGxJzUPxweuqiorw";

function fetchArtists(req, res) {
  const response = fetch('https://api.spotify.com/v1/me/following?type=artist&limit=20', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
  });
  return response
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



export { authorize, getAccountInfo, getAlbums };