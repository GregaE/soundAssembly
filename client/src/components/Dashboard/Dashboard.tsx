import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Outlet } from 'react-router';
import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';
import ArtistList from "./ArtistList";
import ArtistPage from "../ArtistPage/ArtistPage";
import { getLibrary, getUser } from '../../ApiService';
import { login, refresh } from '../../ApiService';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setTags } from '../../store/tagsSlice';
import { Tag } from '../../interfaces/Tag';
import { Artist } from '../../interfaces/Artist';
import { setUsername, setDisplayName } from '../../store/userSlice';
import { setArtists } from '../../store/librarySlice';

function Dashboard(props: { code: string; }) {

  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);

  const [artistList, setArtistList] = useState([] as Artist[]);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState(0);

  const browserWindow: Window = window;

  useEffect(()=> {
    login(props.code)
      .then(res => {
        console.log(res);
        setAccessToken(res.accessToken)
        setRefreshToken(res.refreshToken)
        setExpiresIn(res.expiresIn)
        sessionStorage.setItem('token', res.accessToken)
        getUser().then(account => {
          dispatch(setUsername(account.id));
          dispatch(setDisplayName(account.display_name));
        })
        window.history.pushState({}, "/")
      })
      .catch(() => {browserWindow.location = '/'})
  },[browserWindow, dispatch, props.code])

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
          // dispatch(setArtists())
          setArtistList(userLibrary[0].artists);
          userLibrary[0].tags.forEach((tag: Tag) => tag.status = "inactive");
          if (userLibrary[0]) {
            dispatch(setTags(userLibrary[0].tags))
          }
        }
      }
    }
    fetchLibrary()
  },[setArtistList, username, dispatch])

  return (
    <div>
      <NavBar
        setArtistList={setArtistList}
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