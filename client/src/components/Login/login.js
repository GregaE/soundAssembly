import {authorize} from "../../ApiService";
import logo from '../../logoBlack.png';

function Login() {
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
          <button onClick={authorize}>log in with spotify</button>
        </div>
      </div>
    </div>
  );
}

export default Login;