import Artist from './artist.js';

function ArtistList(props) {

  function renderArtists(list) {
    return list.map(artist => {
      return <Artist artist={artist} key={artist._id}></Artist>
    })
  }

  return (
    <div className="artist-container">
      {renderArtists(props.artistList)}
    </div>
  );
}

export default ArtistList;