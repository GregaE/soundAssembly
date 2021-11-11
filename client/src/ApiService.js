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

const access_token = "BQAiHiTJ95ymh0qgGVmVWbmdT0hzu0rdTiCIZTLD7VIwnoU2w-izaeFM3p-8zLVqR4OcL602b_kemP_W_zck2bz2IfbNQCnet93_I3YhfmpZTCJreJ9RVOzTcm_jM22zg3jNrBLHmifnEsDAVkpJMGq6pOZ2hhTRxIuBYQ";

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