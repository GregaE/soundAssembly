import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import Dashboard from "./components/Library/dashboard";
import ArtistList from "./components/Library/artistList";
import ArtistPage from "./components/ArtistPage/artistPage";
import React, { useState } from 'react';

function App() {
  const [artistList, setArtistlist] = useState([]);
  const [username, setUsername] = useState("");

  return (
    <div className="App">
      <header>
        <h1>Sound Assembly</h1>
      </header>
        <Routes>
          <Route path="/login" exact element={<Login/>} />
          <Route path="/" exact element={<Dashboard
          setArtistlist={setArtistlist}
          setUsername={setUsername}
          username={username}
          />}>
          <Route path="/" exact element={<ArtistList
          artistList={artistList}
          />} />
            <Route path="/artist/:artistId" exact element={<ArtistPage/>} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
