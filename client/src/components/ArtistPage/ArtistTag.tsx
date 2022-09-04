import { untagArtist } from '../../ApiService';
import { Tag } from '../../interfaces/Tag';
import { Artist } from '../../interfaces/Artist';

function ArtistTag(props: { 
  artistTags: Tag[];
  tag: Tag;
  artistInfo: Artist;
  artistList: Artist[];
  username: string;
  setArtistTags: (newList: Tag[]) => void;
  setArtistList: (newList: Artist[]) => void;
  setArtistInfo: (newList: Artist) => void;
}) {
  function removeTag() {
    const newList = props.artistTags
      .map(tag => {return {...tag}})
      .filter(tag => tag.name !== props.tag.name);
    props.setArtistTags(newList);
    if (props.artistInfo._id) {
      untagArtist(props.artistInfo._id, props.tag.name, props.username)
    }
    const artistInfoCopy = JSON.parse(JSON.stringify(props.artistInfo))
    artistInfoCopy.artistTags = newList;
    props.setArtistInfo(artistInfoCopy);

    const artistListCopy = JSON.parse(JSON.stringify(props.artistList));
    const index = artistListCopy.findIndex((artist: Artist) => artist._id === artistInfoCopy.id)
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