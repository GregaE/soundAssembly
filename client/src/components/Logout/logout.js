import { importLibrary } from '../../ApiService';

function Logout(props) {

  const importArtists = () => {
    importLibrary().then(account => {
      console.log(account)
      props.setArtistList(account.artists);
      props.setUsername(account.username);
      if (account) {
        props.setTags(account.tags.map(tag => tag.status = 'inactive'));
      }
    })
  }

  return (
    <div>
      <div className="logout">
        <button onClick={importArtists}>Update library</button>
          <button id="user">Username: <span>{props.username}</span>
          <div class="user-dropdown-content">
            <a href="#">Logout</a>
          </div>
          </button>
      </div>
      <div className="logout buffer">
      </div>
    </div>
  );
}

export default Logout;