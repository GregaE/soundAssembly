import {authorize} from "../../ApiService"

function Login() {
  return (
    <div className="login">
      <div className="login-form">
        <div>
          <h2>Sound Assembly</h2>
        </div>
        <div>
          <h3>Organize your music library</h3>
        </div>
        <div>
          <p>Import your Spotify followed artists and organize them to your liking</p>
        </div>
        <div>
          <button onClick={authorize}>log in with spotify</button>
        </div>
      </div>
    </div>
  );
}

export default Login;