import TagList from './tagList'

function SideBar(props) {

  return (
    <div>
      <div className="sideBar">
        <header>
          <h1>Sound Assembly</h1>
        </header>
        <div>

          <TagList
          tags={props.tags}
          setTags={props.setTags}
          />
        </div>
      </div>
      <div className="sideBar extra">
      </div>
    </div>
  );
}

export default SideBar;