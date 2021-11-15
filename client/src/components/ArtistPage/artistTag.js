import { untagArtist } from '../../ApiService';

function ArtistTag(props) {

  function removeTag() {
    const newList = props.artistTags
      .map(tag => {return {...tag}})
      .filter(tag => tag.name !== props.tag.name);
    props.setArtistTags(newList);
    untagArtist(props.artistInfo.id, props.tag.name)

    const artistInfoCopy = JSON.parse(JSON.stringify(props.artistInfo))
    artistInfoCopy.artistTags = newList;
    props.setArtistInfo(artistInfoCopy);

    const artistListCopy = JSON.parse(JSON.stringify(props.artistList));
    const index = artistListCopy.findIndex(artist => artist.id === artistInfoCopy.id)
    artistListCopy[index] = artistInfoCopy;
    props.setArtistList(artistListCopy);
  }

  return (
    <div className="artistTag">
      {props.tag.name}
      <i onClick={removeTag} className="fa fa-times" aria-hidden="true"/>
    </div>
  );
}

export default ArtistTag;