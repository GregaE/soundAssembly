import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import Dashboard from "./components/Library/dashboard";
import ArtistList from "./components/Library/artistList";
import ArtistPage from "./components/ArtistPage/artistPage";
import React, { useState } from 'react';

function App() {
  const [artistList, setArtistList] = useState([]);
  const [username, setUsername] = useState("");
  const [tags, setTags] = useState([]);

  console.log(tags)

  return (
    <div className="App">
      <Routes>
        <Route path="/login" exact element={<Login/>} />
        <Route path="/" exact element={<Dashboard
          setArtistList={setArtistList}
          setUsername={setUsername}
          setTags={setTags}
          username={username}
          tags={tags}
          />}>
            <Route path="/" exact element={<ArtistList
            artistList={artistList}
            tags={tags}
            />} />
            <Route path="/artist/:artistId" exact element={<ArtistPage/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
