import {authorize} from "../../ApiService"

function Login() {
  return (
    <div className="login">
      <p>Start organising</p>
      <button onClick={authorize}>Log In</button>
    </div>
  );
}

export default Login;