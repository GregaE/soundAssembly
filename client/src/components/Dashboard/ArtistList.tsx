import { useAppSelector } from "../../hooks/reduxHooks";
import { Artist as ArtistInterface } from "../../interfaces/Artist";
import Artist from './Artist';

function ArtistList() {
  const artists = useAppSelector((state) => state.library.artists);

  function renderArtists(list: ArtistInterface[]) {
    if (list.length) {
      return list.map(artist => <Artist artist={artist} key={artist._id} />);
    } else {
      return <p>Your library is empty. Click on "Update Library" to import your followed artists.</p>
    }
    // message 'No artists match the selected criteria.'
  }

  return (
    <div className="artist-container">
      <h2>Artists</h2>
      <div className="artist-list">
        {renderArtists(artists)}
      </div>
    </div>
  );
}

export default ArtistList;