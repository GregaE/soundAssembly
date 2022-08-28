import TagList from './TagList';
import logo from '../../assets/logoWhite.png';

function SideBar(props) {

  return (
    <aside>
      <div className="sideBar">
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
    </aside>
  );
}

export default SideBar;