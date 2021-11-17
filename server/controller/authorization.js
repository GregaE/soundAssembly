const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();


const redirect_uri = 'http://localhost:3000/';

exports.authorize = async (req, res) => {
    console.log(req.body.code)
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: redirect_uri
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

exports.getToken = async (req, res) => {
  // try {
    // your application requests refresh and access tokens
    // after checking the state parameter

  //   var code = req.query.code || null;
  //   var state = req.query.state || null;
  //   var storedState = req.cookies ? req.cookies[stateKey] : null;

  //   if (state === null || state !== storedState) {
  //     res.redirect('/#' +
  //       querystring.stringify({
  //         error: 'state_mismatch'
  //       }));
  //   } else {
  //     res.clearCookie(stateKey);
  //     var authOptions = {
  //       url: 'https://accounts.spotify.com/api/token',
  //       form: {
  //         code: code,
  //         redirect_uri: redirect_uri,
  //         grant_type: 'authorization_code'
  //       },
  //       headers: {
  //         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  //       },
  //       json: true
  //     };

  //     request.post(authOptions, function(error, response, body) {
  //       if (!error && response.statusCode === 200) {

  //         var access_token = body.access_token,
  //             refresh_token = body.refresh_token;

  //         var options = {
  //           url: 'https://api.spotify.com/v1/me',
  //           headers: { 'Authorization': 'Bearer ' + access_token },
  //           json: true
  //         };

  //         // use the access token to access the Spotify Web API
  //         request.get(options, function(error, response, body) {
  //           console.log(body);
  //         });

  //         // we can also pass the token to the browser to make requests from there
  //         res.redirect('/#' +
  //           querystring.stringify({
  //             access_token: access_token,
  //             refresh_token: refresh_token
  //           }));
  //       } else {
  //         res.redirect('/#' +
  //           querystring.stringify({
  //             error: 'invalid_token'
  //           }));
  //       }
  //     });
  //   }
  // } catch (error) {
  //     console.error(error);
  //     res.status(500);
  // }
}

exports.refreshToken = async (req, res) => {
  // try {
  //   // requesting access token from refresh token
  //   var refresh_token = req.query.refresh_token;
  //   var authOptions = {
  //     url: 'https://accounts.spotify.com/api/token',
  //     headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
  //     form: {
  //       grant_type: 'refresh_token',
  //       refresh_token: refresh_token
  //     },
  //     json: true
  //   };

  //   request.post(authOptions, function(error, response, body) {
  //     if (!error && response.statusCode === 200) {
  //       var access_token = body.access_token;
  //       res.send({
  //         'access_token': access_token
  //       });
  //     }
  //   });
  // } catch (error) {
  //     console.error(error);
  //     res.status(500);
  // }
}