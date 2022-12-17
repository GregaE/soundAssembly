import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppSelector } from "../../hooks/reduxHooks";
import logo from '../../assets/logoWhite.png';

export default function NavBar(props: {
  importArtists: () => void,
}){
  const displayName = useAppSelector((state) => state.user.displayName);

  function logout () {
    sessionStorage.removeItem('token')
  }

  const navigate = useNavigate();

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src={ logo } alt="logo" />
        </Link>
      </div>
      <div className="actions">
        <div className="left-btn-group">
          <button className="navigate" id="back-btn" onClick={() => navigate(-1)}><i className="fa fa-arrow-left"/></button>
          <button className="navigate" id="forward-btn" onClick={() => navigate(+1)}><i className="fa fa-arrow-right"/></button>
        </div>
        <div className="right-btn-group">
          <button onClick={ props.importArtists }>Update library</button>
          <button id="user">Username: <span>{ displayName }</span>
            <div onClick={logout} className="user-dropdown-content">
              <a href="/login">Logout</a>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}