const { Router } = require('express');
const { getFollowedArtists, getArtist } = require('./controller/artists');
const { authorize, refreshToken } = require('./controller/authorization');
const { getLibrary, importLibrary } = require('./controller/getLibrary');
const { getTags, createTag, tagArtist, untagArtist } = require('./controller/tags');
const router = Router();

// SPOTIFY API

// OAuth
router.get('/login', authorize);
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
router.post('/tags/add/:artistId', tagArtist);
router.post('/tags/remove/:artistId', untagArtist)


module.exports = router;