const { Router } = require('express');
const { authorize, getToken, refreshToken } = require('./controller/authorization');
const { getArtists } = require('./controller/artists');
const router = Router();

router.get('/login', authorize);
router.get('/callback', getToken);
router.get('/refresh_token', refreshToken);

router.get('/artists', getArtists);



module.exports = router;