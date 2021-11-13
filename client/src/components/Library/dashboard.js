import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { importLibrary, getLibrary } from '../../ApiService';
import SideBar from '../SideBar/sideBar';

function Dashboard({setArtistList, setUsername, setTags, username, tags, artistList}) {

  useEffect(() => {
    // if account has the library pre-populated
    getLibrary().then(account => {
      if (account.length > 0) {
        setArtistList(account[0].artists);
        setUsername(account[0].username);
        setTags(account[0].tags);
      }
    })
    // if account does not have the library pre-populated
  },[setArtistList, setUsername, setTags])

  const importArtists = () => {
    importLibrary().then(account => {
      setArtistList(account.artists);
      setUsername(account.username);
      setTags(account[0].tags);
    })
  }

  return (
    <div className="dashboard">
      <div>
        <SideBar
        setTags={setTags}
        tags={tags}
        artistList={artistList}
        setArtistList={setArtistList}
        >
        </SideBar>
      </div>
      <div>
        <h2>My Dashboard</h2>
        <div>Username: {username}</div>
        <div>
          <button onClick={importArtists}>Update library</button>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Dashboard;