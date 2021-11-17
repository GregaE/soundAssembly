import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Outlet } from 'react-router';
import SideBar from '../SideBar/sideBar';
import Logout from '../Logout/logout';
import ArtistList from "./artistList";
import ArtistPage from "../ArtistPage/artistPage";
import { getLibrary } from '../../ApiService';
import useAuth from '../UseAuth/useAuth';

function Dashboard(props) {
  const accessToken = useAuth(props.code)

  const [artistList, setArtistList] = useState([]);
  const [username, setUsername] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // if account has existing library
    getLibrary().then(account => {
      if (account.length > 0) {
        setArtistList(account[0].artists);
        setUsername(account[0].username);
        account[0].tags.forEach(tag => tag.status = "inactive");
        if (account[0]) {
          setTags(account[0].tags);
        }
      }
    })
  },[setArtistList, setUsername, setTags])

  return (
    <div className="dashboard">
      <div>
        <SideBar
        setTags={setTags}
        tags={tags}
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
        />
        <Routes>
          <Route path="/" exact element={<ArtistList
          artistList={artistList}
          tags={tags}
          />} />
          <Route path="/artist/:artistId" exact element={<ArtistPage
            tags={tags}
            setTags={setTags}
            artistList={artistList}
            setArtistList={setArtistList}
            />}
          />
        </Routes>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Dashboard;