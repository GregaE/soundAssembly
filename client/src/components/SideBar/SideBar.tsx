import TagList from './TagList';

function SideBar() {

  return (
    <aside>
      <div className="sideBar">
        <div>
          <TagList />
        </div>
      </div>
      <div className="sideBar extra">
      </div>
    </aside>
  );
}

export default SideBar;