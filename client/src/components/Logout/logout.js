import { importLibrary } from '../../ApiService';

function Logout(props) {

  const importArtists = async () => {
    await importLibrary().then(account => {
      props.setArtistList(account.artists);
      props.setUsername(account.username);
      // Create the tag list and set the status the default inactive status
      const newTagList = account.tags.map(function(tag) {
        return {name:tag.name, status: "inactive"}
      })
      props.setTags(newTagList);
    })
  }

  return (
    <div>
      <div className="logout">
        <button onClick={importArtists}>Update library</button>
          <button id="user">Username: <span>{props.username}</span>
          <div className="user-dropdown-content">
            <a href="https://www.google.com/">Logout</a>
          </div>
          </button>
      </div>
      <div className="logout buffer">
      </div>
    </div>
  );
}

export default Logout;