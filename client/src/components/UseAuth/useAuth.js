import { useState, useEffect } from 'react';
import { login, refresh } from '../../ApiService';

function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  console.log(accessToken)

  useEffect(()=> {
    login(code)
      .then(res => {
        console.log(res)
        setAccessToken(res.accessToken)
        setRefreshToken(res.refreshToken)
        setExpiresIn(res.expiresIn)
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
        })
        .catch(() => {window.location = '/'})
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  },[refreshToken, expiresIn])

  return accessToken
}

export default useAuth;