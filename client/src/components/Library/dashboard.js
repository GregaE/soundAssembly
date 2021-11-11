import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { getAccountInfo } from '../../ApiService';
// import ArtistList  from './artistList.js';

function Dashboard(props) {

  useEffect(() => {
    getAccountInfo().then(account => {
      props.setArtistlist(account.artists);
      props.setUsername(account.username)
    })
  },[props])

  return (
    <div className="dashboard">
      <h2>My Dashboard</h2>
      <div>Username: {props.username}</div>
      <div>
        <button>Update library</button>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default Dashboard;