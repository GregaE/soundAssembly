import { useCallback, useEffect, useRef, useState } from 'react';
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
import { 
  setUsername,
  setDisplayName,
  setAccessToken,
  setRefreshToken,
  setExpiresIn,
} from '../../store/userSlice';
import { fetchArtists, incrementCurrentPage } from '../../store/librarySlice';
import useImportArtists from '../../hooks/useImportArtists';
import Loader from '../Loader/Loader';

function Dashboard(props: { code: string; }) {

  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);
  const [artistList, setArtistList] = useState<Artist[]>([]);
  const refreshToken = useAppSelector((state) => state.user.refreshToken);
  const expiresIn = useAppSelector((state) => state.user.expiresIn);

  const { importArtists, isLoadingImport } = useImportArtists();

  const browserWindow: Window = window;

  useEffect(()=> {
    login(props.code)
      .then(res => {
        dispatch(setAccessToken(res.accessToken))
        dispatch(setRefreshToken(res.refreshToken))
        dispatch(setExpiresIn(res.expiresIn))
        localStorage.setItem('token', res.accessToken)
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
          dispatch(setAccessToken(res.accessToken))
          dispatch(setExpiresIn(res.expiresIn))
          localStorage.setItem('token', res.accessToken)
        })
        .catch(() => {browserWindow.location = '/'})
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  })


  useEffect(() => {
    if (username) {
      const fetchLibrary = async function() {
        const tags = await getTags();
        if (tags && tags.length) dispatch(setTags(tags));
        dispatch(fetchArtists());
      }
      fetchLibrary()
    }
  },[username, dispatch])

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
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
        importArtists={importArtists}
      />
      <div className="dashboard">
        <SideBar />
        <main>
        { isLoadingImport ? <Loader /> :  
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
          }
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;