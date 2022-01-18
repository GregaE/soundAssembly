const { Router } = require('express');
const { getFollowedArtists, getArtist } = require('./controller/artists');
const { authorize, refreshToken } = require('./controller/authorization');
const { getLibrary, importLibrary } = require('./controller/getLibrary');
const { getTags, createTag, tagArtist, untagArtist } = require('./controller/tags');
const router = Router();

// SPOTIFY API

// OAuth
router.post('/login', authorize);
router.get('/refresh', refreshToken);

// Featch followed artists for account and create account instance in db
router.post('/importLibrary/:username', importLibrary);

// FROM DB

// Artists
router.get('/artists', getFollowedArtists);
router.get('/artists/:artistId', getArtist);

// Fetch library for the account
router.get('/getLibrary/:username', getLibrary);

// Tags
router.get('/tags/:username', getTags);
router.post('/tags/:username', createTag);
router.post('/tags/add/:artistId/:username', tagArtist);
router.post('/tags/remove/:artistId/:username', untagArtist);

// Test route

router.get('/tryme', async (req, res) => {
  try {
    res.send({
      "hello": "success"
  });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
})

module.exports = router;