import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { getAccountInfo } from '../../ApiService';
// import ArtistList  from './artistList.js';

function Dashboard({setArtistlist, setUsername, username}) {

  useEffect(() => {
    getAccountInfo().then(account => {
      setArtistlist(account.artists);
      setUsername(account.username)
    })
  },[setArtistlist, setUsername])

  return (
    <div className="dashboard">
      <h2>My Dashboard</h2>
      <div>Username: {username}</div>
      <div>
        <button>Update library</button>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default Dashboard;