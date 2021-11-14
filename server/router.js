const { Router } = require('express');
const { getFollowedArtists, getArtist } = require('./controller/artists');
const { authorize, getToken, refreshToken } = require('./controller/authorization');
const { getLibrary, importLibrary } = require('./controller/getLibrary');
const { getTags, createTag } = require('./controller/tags');
const router = Router();

// SPOTIFY API

// OAuth
router.get('/login', authorize);
router.get('/callback', getToken);
router.get('/refresh_token', refreshToken);

// Fetch artists
router.get('/importLibrary', importLibrary);

// FROM DB

// Artists
router.get('/artists', getFollowedArtists);
router.get('/artists/:artistId', getArtist);

// Fetch library for the account
router.get('/getLibrary', getLibrary);

// Tags
router.get('/tags', getTags);
router.post('/tags', createTag);

module.exports = router;