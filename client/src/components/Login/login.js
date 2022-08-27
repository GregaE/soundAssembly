import logo from '../../assets/logoBlack.png';
require('dotenv').config();

function Login() {

  const params = new URLSearchParams({
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
    scope: 'user-read-private%20user-top-read%20user-follow-read%20user-follow-modify%20user-library-read',
  });
  const base_url = 'https://accounts.spotify.com/authorize?'
  const auth = base_url + params;

  return (
    <div className="login">
      <div className="login-form">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div>
          <h3>Organize your music library</h3>
        </div>
        <div>
          <p>Import your Spotify followed artists and organize them to your liking</p>
        </div>
        <div>
          <button><a href={auth}>log in with spotify</a></button>
        </div>
      </div>
    </div>
  );
}

export default Login;