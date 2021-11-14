import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getAlbums, getArtist } from '../../ApiService';
import AlbumList from './albumList';
import ArtistDetails from './artistDetails';
import ArtistTagList from './artistTagList'

function ArtistPage(props) {

  const [albumList, setAlbumlist] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);

  const {artistId} = useParams();

  useEffect(() => {
    getAlbums(artistId).then(albums => {
      setAlbumlist([...albums.items])
    });
    getArtist(artistId).then(artist => {
      setArtistInfo(artist)
    })
  },[artistId])

  return (
    <div className="artistPage">
      <div>
        <ArtistDetails artistInfo={artistInfo} />
        <ArtistTagList
          artistTags={artistInfo.artistTags}
          tags={props.tags}
        />
      </div>
      <AlbumList albumList={albumList}></AlbumList>
    </div>
  );
}

export default ArtistPage;