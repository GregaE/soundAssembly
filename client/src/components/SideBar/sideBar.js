import TagList from './tagList'

function SideBar(props) {

  return (
    <div className="sideBar">
      <TagList
      tags={props.tags}
      setTags={props.setTags}
      artistList={props.artistList}
      setArtistList={props.setArtistList}
      />
    </div>
  );
}

export default SideBar;