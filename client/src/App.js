import React, { useEffect, useState } from 'react';
import Login from "./components/Login/login";
import Dashboard from "./components/Library/dashboard";

function App() {

  const [code, setCode] = useState("");

  useEffect(()=> {
    if(sessionStorage.getItem('token')) {
      const storedToken = sessionStorage.getItem('token');
      setCode(storedToken)
    }
    else {
      const urlCode = new URLSearchParams(window.location.search).get('code');
      setCode(urlCode)
    }
  },[setCode])

  // const code = new URLSearchParams(window.location.search).get('code')

  return code || sessionStorage.getItem('token') ? <Dashboard code={code} /> : <Login/>
}

export default App;
