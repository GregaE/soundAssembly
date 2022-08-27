import React from 'react';
import Login from "./components/Login/Login";
import Dashboard from "./components/Library/Dashboard";

function App() {
  const code = new URLSearchParams(window.location.search).get('code');

  return code ? <Dashboard code={code}/> : <Login/>
}

export default App;
