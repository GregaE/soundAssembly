import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { importLibrary, getLibrary } from '../../ApiService';
import SideBar from '../SideBar/sideBar';

function Dashboard({setArtistList, setUsername, setTags, username, tags}) {

  useEffect(() => {
    // if account has existing library
    getLibrary().then(account => {
      if (account.length > 0) {
        setArtistList(account[0].artists);
        setUsername(account[0].username);
        account[0].tags.forEach(tag => tag.status = "inactive");
        if (account[0].tags) {
          setTags(account[0].tags);
        }
      }
    })
  },[setArtistList, setUsername, setTags])

  const importArtists = () => {
    importLibrary().then(account => {
      setArtistList(account.artists);
      setUsername(account.username);
      setTags(account[0].tags.map(tag => tag.status = 'inactive'));
    })
  }

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