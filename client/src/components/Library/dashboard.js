import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Outlet } from 'react-router';
import SideBar from '../SideBar/SideBar';
import Logout from '../Logout/Logout';
import ArtistList from "./ArtistList";
import ArtistPage from "../ArtistPage/ArtistPage";
import { getLibrary, getUser } from '../../ApiService';
import { login, refresh } from '../../ApiService';

function Dashboard(props) {

  const [artistList, setArtistList] = useState([]);
  const [username, setUsername] = useState("");
  const [tags, setTags] = useState([]);

  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(()=> {
    login(props.code)
      .then(res => {
        setAccessToken(res.accessToken)
        setRefreshToken(res.refreshToken)
        setExpiresIn(res.expiresIn)
        sessionStorage.setItem('token', res.accessToken)
        getUser().then(account => setUsername(account.display_name))
        window.history.pushState({}, null, "/")
      })
      .catch(() => {window.location = '/'})
  },[props.code])

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


  useEffect(() => {
    // if account has existing library
    if (username) {
      getLibrary(username).then(account => {
        if (account && account.length > 0) {
          setArtistList(account[0].artists);
          account[0].tags.forEach(tag => tag.status = "inactive");
          if (account[0]) {
            setTags(account[0].tags);
          }
        }
      })
    }
  },[setArtistList, setUsername, setTags, username])

  return (
    <div className="dashboard">
      <div>
        <SideBar
        setTags={setTags}
        tags={tags}
        username={username}
        >
        </SideBar>
      </div>
      <div>
        <Logout
          setArtistList={setArtistList}
          setTags={setTags}
          setUsername={setUsername}
          username={username}
          tags={tags}
          accessToken={accessToken}
        />
        <Routes>
          <Route path="/" exact element={<ArtistList
          artistList={artistList}
          tags={tags}
          username={username}
          />} />
          <Route path="/artist/:artistId" exact element={<ArtistPage
            tags={tags}
            setTags={setTags}
            artistList={artistList}
            setArtistList={setArtistList}
            username={username}
            />}
          />
        </Routes>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Dashboard;