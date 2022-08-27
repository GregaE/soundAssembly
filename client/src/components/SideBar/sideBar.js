import TagList from './TagList';
import logo from '../../assets/logoWhite.png';

function SideBar(props) {

  return (
    <div>
      <div className="sideBar">
        <header>
          <img src={logo} alt="logo" />
        </header>
        <div>
          <TagList
          tags={props.tags}
          setTags={props.setTags}
          username={props.username}
          />
        </div>
      </div>
      <div className="sideBar extra">
      </div>
    </div>
  );
}

export default SideBar;