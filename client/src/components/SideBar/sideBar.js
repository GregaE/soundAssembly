import TagList from './tagList'

function SideBar(props) {

  return (
    <div className="sideBar">
      <TagList
      tags={props.tags}
      setTags={props.setTags}
      artistList={props.artistList}
      setArtistlist={props.setArtistlist}
      />
    </div>
  );
}

export default SideBar;