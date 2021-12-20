import Login from "./components/Login/login";
import Dashboard from "./components/Library/dashboard";

function App() {
  const code = new URLSearchParams(window.location.search).get('code');

  if (sessionStorage.getItem('token')) {
    console.log(code)
    return <Dashboard code={sessionStorage.getItem('token')} />
  }
  else if (code) {
    return <Dashboard code={code} />
  }
  else {
    return <Login />
  }
}

export default App;
