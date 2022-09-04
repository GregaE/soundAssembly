import { useState, useEffect } from 'react';
import { login, refresh } from '../../ApiService';

function UseAuth(code: string) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  const browserWindow: Window = window;

  useEffect(()=> {
    login(code)
      .then(res => {
        setAccessToken(res.accessToken)
        setRefreshToken(res.refreshToken)
        setExpiresIn(res.expiresIn)
        sessionStorage.setItem('token', res.accessToken)
        browserWindow.history.pushState({}, "/")
      })
      .catch(() => {browserWindow.location = '/'})
  },[browserWindow, code])

  useEffect(()=> {
    if(!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      refresh(refreshToken)
        .then(res => {
          setAccessToken(res.accessToken)
          setExpiresIn(res.expiresIn)
          sessionStorage.setItem('token', res.accessToken)
        })
        .catch(() => {browserWindow.location = '/'})
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  },[refreshToken, expiresIn, browserWindow])

  return accessToken
}

export default UseAuth;