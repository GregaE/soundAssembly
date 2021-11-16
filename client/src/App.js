import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import Dashboard from "./components/Library/dashboard";
import ArtistList from "./components/Library/artistList";
import ArtistPage from "./components/ArtistPage/artistPage";
import { getLibrary } from './ApiService';

function App() {
  // Code returned by spotify API during auth
  const code = new URLSearchParams(window.location.search).get('code');

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


    <div className="App">
      <Routes>
        <Route path="/login" exact element={<Login/>} />
        <Route path="/" exact element={<Dashboard
          setArtistList={setArtistList}
          setTags={setTags}
          setUsername={setUsername}
          username={username}
          tags={tags}
          />}
        >
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
