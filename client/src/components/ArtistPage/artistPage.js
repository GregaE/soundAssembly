import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getAlbums, getArtist } from '../../ApiService';
import AlbumList from './albumList';
import ArtistDetails from './artistDetails';

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
      <ArtistDetails artistInfo={artistInfo}></ArtistDetails>
      <AlbumList albumList={albumList}></AlbumList>
    </div>
  );
}

export default ArtistPage;