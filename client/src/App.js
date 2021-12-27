import React from 'react';
import Login from "./components/Login/login";
import Dashboard from "./components/Library/dashboard";

function App() {
  const code = new URLSearchParams(window.location.search).get('code');

  return code ? <Dashboard code={code}/> : <Login/>
}

export default App;
