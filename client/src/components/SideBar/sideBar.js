import TagList from './tagList'

function SideBar(props) {

  return (
    <div className="sideBar">
      <TagList tags={props.tags} setTags={props.setTags} />
    </div>
  );
}

export default SideBar;