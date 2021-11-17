import { useState, useEffect } from 'react';
import { login } from '../../ApiService';

function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(()=> {
    login(code)
      .then(res => console.log(res))
      // .catch(() => {window.location = '/'})
  },[code])

}

export default useAuth;