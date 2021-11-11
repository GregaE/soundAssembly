import Artist from './artist.js';

function ArtistList(props) {

  function renderArtists(list) {

    return list
      .sort(function(a,b) {
        return (a.name < b.name) ? -1 : 1;
      })
      .map(artist => {
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