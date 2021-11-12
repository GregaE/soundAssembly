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
  return fetchRequest('/importLibrary')
}

// Requests directly to Spotify API

const access_token = "BQCUx7Y2sjcj3GR8LNSrQLPDcMFpWlvwx0od5Uv_HCrsFs6U2dtAP4ir3h-xzCCSBfHLIrk3tBMOydzGSP0EElO6u98GhJj5gL8eQ9L_AjGoWetFeFIYS62g0sQWIPYe2yklsTAOqD-nxloUc5Gl1xUntlM7Q6moNqgVqA";

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



export { authorize, getAccountInfo, getAlbums, getArtist };