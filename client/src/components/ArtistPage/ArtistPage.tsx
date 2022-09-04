import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getAlbums, getArtist } from '../../ApiService';
import AlbumList from './AlbumList';
import ArtistDetails from './ArtistDetails';
import ArtistTagList from './ArtistTagList';
import { Artist } from '../../interfaces/Artist';
import { Album } from '../../interfaces/Album';
import { Tag } from '../../interfaces/Tag';

function ArtistPage(props: { username: string; artistList: Artist[]; setArtistList: (newList: Artist[]) => void }) {

  const [albumList, setAlbumList] = useState([] as Album[]);
  const [artistInfo, setArtistInfo] = useState({} as Artist);
  const [artistTags, setArtistTags] = useState([] as Tag[]);

  const {artistId} = useParams();

  useEffect(() => {
    getAlbums(artistId).then(albums => {
      console.log(albums);
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