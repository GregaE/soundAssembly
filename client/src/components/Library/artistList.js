import Artist from './artist.js';

function ArtistList(props) {

  function renderArtists(list) {
    if (list.length > 0) {
      return list
        .sort(function(a,b) {
          return (a.name < b.name) ? -1 : 1;
        })
        // filter here based on tag
          // loop through artist tags
            // if none of the tags are in the current tags.active
        .map(artist => {
          return <Artist artist={artist} key={artist._id}></Artist>
      })
    }
    else {
      return <p>Your library is empty. Click on "Update Library" to import your followed artists.</p>
    }
  }

  return (
    <div className="artist-container">
      {renderArtists(props.artistList)}
    </div>
  );
}

export default ArtistList;