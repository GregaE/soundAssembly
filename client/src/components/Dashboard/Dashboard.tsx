import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Outlet } from 'react-router';
import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';
import ArtistList from "./ArtistList";
import ArtistPage from "../ArtistPage/ArtistPage";
import { getUser, getTags } from '../../ApiService';
import { login, refresh } from '../../ApiService';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setTags } from '../../store/tagsSlice';
import { Artist } from '../../interfaces/Artist';
import { setUsername, setDisplayName } from '../../store/userSlice';
import { fetchArtists, incrementCurrentPage } from '../../store/librarySlice';

function Dashboard(props: { code: string; }) {

  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);
  const [artistList, setArtistList] = useState<Artist[]>([]);
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
    if (username) {
      const fetchLibrary = async function() {
        const tags = await getTags();
        if (tags && tags.length) dispatch(setTags(tags));
        dispatch(fetchArtists());
      }
      fetchLibrary()
    }
  },[setArtistList, username, dispatch])

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      // if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries, options) => {
        if (entries[0].isIntersecting) {
          dispatch(incrementCurrentPage());
          dispatch(fetchArtists())
        }
      }, { rootMargin: "100px" });
      if (node) observer.current.observe(node);
    },
    [dispatch]
  );

  return (
    <div>
      <NavBar
        setArtistList={setArtistList}
        accessToken={accessToken}
      />
      <div className="dashboard">
        <SideBar />
        <main>
          <Routes>
            <Route path="/" element={
              <ArtistList ref={lastPostRef} />
            } />
            <Route path="/artist/:artistId" element={
              <ArtistPage
                artistList={artistList}
                setArtistList={setArtistList}
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