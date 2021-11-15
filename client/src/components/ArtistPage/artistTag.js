import { untagArtist } from '../../ApiService';

function ArtistTag(props) {

  function removeTag() {
    const newList = props.artistTags
      .map(tag => {return {...tag}})
      .filter(tag => tag.name !== props.tag.name);
    props.setArtistTags(newList);
    untagArtist(props.artistInfo.id, props.tag.name)
  }

  return (
    <div className="artistTag">
      {props.tag.name}
      <i onClick={removeTag} className="fa fa-times" aria-hidden="true"/>
    </div>
  );
}

export default ArtistTag;