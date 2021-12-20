import { importLibrary } from '../../ApiService';
import { useNavigate } from 'react-router-dom';

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

  function logout () {
    sessionStorage.removeItem('token')
  }

  const navigate = useNavigate();

  return (
    <div>
      <div className="logout">
      <button className="navigate" id="back-btn" onClick={() => navigate(-1)}><i className="fa fa-arrow-left"/></button>
        <button className="navigate" id="forward-btn" onClick={() => navigate(+1)}><i className="fa fa-arrow-right"/></button>
        <button onClick={importArtists}>Update library</button>
        <button id="user">Username: <span>mavienajera</span>
          <div onClick={logout} className="user-dropdown-content">
            <a href="/login">Logout</a>
          </div>
        </button>
      </div>
      <div className="logout buffer">
      </div>
    </div>
  );
}

export default Logout;