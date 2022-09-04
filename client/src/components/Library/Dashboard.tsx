import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Outlet } from 'react-router';
import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';
import ArtistList from "./ArtistList";
import ArtistPage from "../ArtistPage/ArtistPage";
import { getLibrary, getUser } from '../../ApiService';
import { login, refresh } from '../../ApiService';
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { setTags } from '../../store/tagsSlice';
import { Tag } from '../../interfaces/Tag';
import { Artist } from '../../interfaces/Artist';

function Dashboard(props: { code: string; }) {

  const dispatch = useAppDispatch();

  const tags = useAppSelector((state) => state.tags.tags);

  const [artistList, setArtistList] = useState([] as Artist[]);
  const [username, setUsername] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState(0);

  const browserWindow: Window = window;

  useEffect(()=> {
    login(props.code)
      .then(res => {
        setAccessToken(res.accessToken)
        setRefreshToken(res.refreshToken)
        setExpiresIn(res.expiresIn)
        sessionStorage.setItem('token', res.accessToken)
        getUser().then(account => setUsername(account.display_name))
        window.history.pushState({}, "/")
      })
      .catch(() => {browserWindow.location = '/'})
  },[browserWindow, props.code])

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


  useEffect(() => {
    // if account has existing library
    async function fetchLibrary() {
      if (username) {
        const userLibrary = await getLibrary(username);
        if (userLibrary && userLibrary.length > 0) {
          setArtistList(userLibrary[0].artists);
          userLibrary[0].tags.forEach((tag: Tag) => tag.status = "inactive");
          if (userLibrary[0]) {
            dispatch(setTags(userLibrary[0].tags))
          }
        }
      }
    }
    fetchLibrary()
  },[setArtistList, setUsername, username, dispatch])

  return (
    <div>
      <NavBar
        setArtistList={setArtistList}
        setUsername={setUsername}
        username={username}
        accessToken={accessToken}
      />
      <div className="dashboard">
        <SideBar username={username} />
        <main>
          <Routes>
            <Route path="/" element={
              <ArtistList
                artistList={artistList}
                username={username}
            />} />
            <Route path="/artist/:artistId" element={
              <ArtistPage
                artistList={artistList}
                setArtistList={setArtistList}
                username={username}
              />}
            />
          </Routes>
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;