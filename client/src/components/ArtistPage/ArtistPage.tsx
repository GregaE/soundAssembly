import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getAlbums, getArtist } from '../../ApiService';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import AlbumList from './AlbumList';
import ArtistDetails from './ArtistDetails';
import ArtistTagList from './ArtistTagList';
import { Artist } from '../../interfaces/Artist';
import {
  setArtistDetails,
  setArtistAlbums,
  setArtistTags,
} from '../../store/artistSlice';
import { Album } from '../../interfaces/Album';

function ArtistPage(props: { username: string; artistList: Artist[]; setArtistList: (newList: Artist[]) => void }) {

  const dispatch = useAppDispatch();

  const artistDetails = useAppSelector((state) => state.artist.details);
  const albumList = useAppSelector((state) => state.artist.albums);
  const artistTags = useAppSelector((state) => state.artist.tags);

  const { artistId } = useParams();

  useEffect(() => {
    if (artistId) {
      getAlbums(artistId).then(discography => {
        const albums = discography.items.filter((item: Album & { album_group: string }) => item.album_group === 'album')
        dispatch(setArtistAlbums(albums));
      });
      getArtist(artistId, props.username).then(artist => {
        dispatch(setArtistDetails(artist));
        dispatch(setArtistTags(artist.artistTags));
      })
    }
  },[artistId, props.username])

  return (
    <div className="artistPage">
      <div className="artistInfo-container">
        <ArtistDetails artistDetails={artistDetails} />
        <ArtistTagList
          artistTags={artistTags}
          artistDetails={artistDetails}
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