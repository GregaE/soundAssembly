import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getAlbums } from '../../ApiService';
import AlbumList from './albumList';

function ArtistPage(props) {

  const [albumList, setAlbumlist] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);

  const {artistId} = useParams();

  useEffect(() => {
    getAlbums(artistId).then(albums => {
      setAlbumlist([...albums.items])
    })
  },[artistId])

  return (
    <div className="artistPage">
      <div>
        Artist ID: {artistId}
      </div>
      <AlbumList albumList={albumList}></AlbumList>
    </div>
  );
}

export default ArtistPage;