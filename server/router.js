const { Router } = require('express');
const { getFollowedArtists } = require('./controller/artists');
const { authorize, getToken, refreshToken } = require('./controller/authorization');
const { importLibrary } = require('./controller/importLibrary');
const { getTags, createTag } = require('./controller/tags');
const router = Router();

// OAuth
router.get('/login', authorize);
router.get('/callback', getToken);
router.get('/refresh_token', refreshToken);

// Fetch library for the account
router.get('/importLibrary', importLibrary);

// Artists
router.get('/artists', getFollowedArtists);

// Tags
router.get('/tags', getTags);
router.post('/tags', createTag);

module.exports = router;