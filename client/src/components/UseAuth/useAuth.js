import { useState, useEffect } from 'react';
import { login, refresh } from '../../ApiService';

function UseAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(()=> {
    login(code)
      .then(res => {
        setAccessToken(res.accessToken)
        setRefreshToken(res.refreshToken)
        setExpiresIn(res.expiresIn)
        console.log("mygod")
        sessionStorage.setItem('token', res.accessToken)
        window.history.pushState({}, null, "/")
      })
      .catch(() => {window.location = '/'})
  },[code])

  useEffect(()=> {
    if(!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      refresh(refreshToken)
        .then(res => {
          setAccessToken(res.accessToken)
          setExpiresIn(res.expiresIn)
          sessionStorage.setItem('token', res.accessToken)
        })
        .catch(() => {window.location = '/'})
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  },[refreshToken, expiresIn])

  return accessToken
}

export default UseAuth;