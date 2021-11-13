import TagList from './tagList'

function SideBar(props) {

  return (
    <div className="sideBar">
      <header>
        <h1>Sound Assembly</h1>
      </header>
      <TagList
      tags={props.tags}
      setTags={props.setTags}
      />
    </div>
  );
}

export default SideBar;