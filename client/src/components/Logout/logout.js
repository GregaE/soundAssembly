import { importLibrary } from '../../ApiService';

function Logout(props) {

  const importArtists = () => {
    importLibrary().then(account => {
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
        <button id="user">Username: <span>{props.username}</span></button>
      </div>
      <div className="logout buffer">
      </div>
    </div>
  );
}

export default Logout;