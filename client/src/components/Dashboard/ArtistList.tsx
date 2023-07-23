import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Artist as ArtistInterface } from "../../interfaces/Artist";
import Artist from './Artist';

const ArtistList = React.forwardRef<HTMLDivElement>((props, ref) => {
  const artists = useAppSelector((state) => state.library.artists);
  const status = useAppSelector((state) => state.library.status);
  const tags = useAppSelector((state) => state.tags.tags);

  function renderArtists(list: ArtistInterface[]) {
    if (!list.length) {
      if (tags.some(tag => tag.active)) {
        return <p>No artists match the selected criteria.</p>
      }
      return <p>Your library is empty. Click on "Update Library" to import your followed artists.</p>
    }
    return list.map((artist, index) => (list.length === index + 1) ?
      <Artist ref={ref} artist={artist} key={artist._id} /> : <Artist artist={artist} key={artist._id} />);
  }

  return (
    <div className="artist-container">
      <h2>Artists</h2>
      <div className="artist-list">
        {renderArtists(artists)}
      </div>
      { status === 'loading' ? 'Fetching artists...' : ''}
    </div>
  );
});

export default ArtistList;