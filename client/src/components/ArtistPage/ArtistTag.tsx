import { useAppDispatch } from "../../hooks/reduxHooks";
import { untagArtist } from '../../ApiService';
import { Tag } from '../../interfaces/Tag';
import { Artist } from '../../interfaces/Artist';
import { setArtistDetails, removeArtistTag } from '../../store/artistSlice';

function ArtistTag(props: { 
  artistTags: Tag[];
  tag: Tag;
  artistDetails: Artist;
  artistList: Artist[];
  username: string;
  setArtistList: (newList: Artist[]) => void;
}) {
  const dispatch = useAppDispatch();

  function removeTag() {
    const newList = props.artistTags
      .map(tag => {return {...tag}})
      .filter(tag => tag.name !== props.tag.name);
    dispatch(removeArtistTag(props.tag));
    if (props.artistDetails._id) {
      untagArtist(props.artistDetails._id, props.tag.name, props.username)
    }
    const artistInfoCopy = JSON.parse(JSON.stringify(props.artistDetails))
    artistInfoCopy.artistTags = newList;
    dispatch(setArtistDetails(artistInfoCopy));

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