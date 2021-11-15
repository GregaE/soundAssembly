import React from 'react';
import { Outlet } from 'react-router';
import SideBar from '../SideBar/sideBar';
import Logout from '../Logout/logout';

function Dashboard({setArtistList, setUsername, setTags, username, tags}) {

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
        />
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Dashboard;