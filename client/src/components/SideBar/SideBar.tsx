import TagList from './TagList';

function SideBar(props: { username: string; }) {

  return (
    <aside>
      <div className="sideBar">
        <div>
          <TagList
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