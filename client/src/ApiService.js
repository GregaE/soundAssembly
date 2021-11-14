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

// Create tag

const createTag = (tagName) => {
  return fetchRequest('/tags', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name: tagName})
  })
}

// Requests directly to Spotify API

const access_token = "BQA1j-BC2L_5xDqEc_k_TmABGSZH2MnVGfKEgkpiU10toJ7E6pBZtP7_C4QAQdRNSHSsj5GqfmFQ503RxSsUR7ueez25MZWFGhYaLnwyNrGn-wyqd7kKITwktsvuTOc3qJndZ7zCF9nDtrnFqKYNFDZj_jVCPhp1GIDc-A";

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



export { authorize, importLibrary, getLibrary, getAlbums, getArtist, createTag };