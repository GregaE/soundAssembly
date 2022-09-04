import { importLibrary } from '../../ApiService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setTags } from '../../store/tagsSlice';
import logo from '../../assets/logoWhite.png';
import { Artist } from '../../interfaces/Artist';
import { Tag } from '../../interfaces/Tag';

export default function NavBar(props: { 
  accessToken: string;
  username: string;
  setArtistList: (newList: Artist[]) => void;
  setUsername: (newUsername: string) => void;
}) {
  const dispatch = useAppDispatch();

  const importArtists = async () => {
    console.log('start')
    await importLibrary(props.accessToken, props.username).then(account => {
      props.setArtistList(account.artists);
      props.setUsername(account.username);
      // Create the tag list and set the status the default inactive status
      const newTagList = account.tags.map(function(tag: Tag) {
        return {name:tag.name, status: "inactive"}
      })
      dispatch(setTags(newTagList));
    })
    console.log('finish')
  }

  function logout () {
    sessionStorage.removeItem('token')
  }

  const navigate = useNavigate();

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="actions">
        <div className="left-btn-group">
          <button className="navigate" id="back-btn" onClick={() => navigate(-1)}><i className="fa fa-arrow-left"/></button>
          <button className="navigate" id="forward-btn" onClick={() => navigate(+1)}><i className="fa fa-arrow-right"/></button>
        </div>
        <div className="right-btn-group">
          <button onClick={importArtists}>Update library</button>
          <button id="user">Username: <span>{props.username}</span>
            <div onClick={logout} className="user-dropdown-content">
              <a href="/login">Logout</a>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}