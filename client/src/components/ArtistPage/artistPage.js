import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getAlbums, getArtist } from '../../ApiService';
import AlbumList from './AlbumList';
import ArtistDetails from './ArtistDetails';
import ArtistTagList from './ArtistTagList'

function ArtistPage(props) {

  const [albumList, setAlbumList] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);
  const [artistTags, setArtistTags] = useState([]);

  const {artistId} = useParams();

  useEffect(() => {
    getAlbums(artistId).then(albums => {
      setAlbumList([...albums.items])
    });
    getArtist(artistId, props.username).then(artist => {
      setArtistInfo(artist)
      setArtistTags(artist.artistTags)
    })
  },[artistId, props.username])

  return (
    <div className="artistPage">
      <div className="artistInfo-container">
        <ArtistDetails artistInfo={artistInfo} />
        <ArtistTagList
          artistTags={artistTags}
          setArtistTags={setArtistTags}
          artistInfo={artistInfo}
          setArtistInfo={setArtistInfo}
          tags={props.tags}
          setTags={props.setTags}
          artistList={props.artistList}
          setArtistList={props.setArtistList}
          username={props.username}
        />
      </div>
      <AlbumList albumList={albumList}></AlbumList>
    </div>
  );
}

export default ArtistPage;