const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

exports.authorize = async (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_REDIRECT_URI
    });

    spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        })
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
}

exports.refreshToken = async (req, res) => {
  const code = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_REDIRECT_URI,
      refreshToken
    });

    spotifyApi
      .refreshAccessToken(code)
      .then(data => {
        res.json({
          accessToken: data.body.access_token,
          expiresIn: data.body.expires_in,
        })
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
}