const { Router } = require('express');
const { getFollowedArtists, getArtist } = require('./controller/artists');
const { authorize, refreshToken } = require('./controller/authorization');
const { getLibrary, importLibrary } = require('./controller/library');
const { getTags, createTag, tagArtist, untagArtist } = require('./controller/tags');
const router = Router();

// SPOTIFY API

// OAuth
router.post('/login', authorize);
router.get('/refresh', refreshToken);

// Fetch followed artists for account and create account instance in db
router.post('/importLibrary/:username', importLibrary);

// FROM DB

// Artists
router.get('/artists/:username', getFollowedArtists);
router.get('/artists/:artistId/:username', getArtist);

// Fetch library for the account
router.get('/getLibrary/:username', getLibrary);

// Tags
router.get('/tags/:username', getTags);
router.post('/tags/:username', createTag);
router.put('/tags/add/:artistId/:username', tagArtist);
router.put('/tags/remove/:artistId/:username', untagArtist);

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