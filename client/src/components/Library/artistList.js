import Artist from './artist.js';

function ArtistList(props) {

  function renderArtists(list) {
    if (list.length > 0) {
      // when no tag filters are applied show all artists
      if (props.tags.every(tag => tag.status === "inactive")) {
        return list
          .sort(function(a,b) {
            return (a.name < b.name) ? -1 : 1;
          })
          .map(artist => {
            return <Artist artist={artist} key={artist._id}></Artist>
        })
      }
      else {
        const filteredList = list
          .filter(artist => artist.artistTags
            .some(artistTag => props.tags
              .filter(tag => tag.status !== "inactive")
              .some(tag => tag.name === artistTag.name)))
        if (filteredList.length > 0) {
          return filteredList.sort(function(a,b) {
            return (a.name < b.name) ? -1 : 1;
          })
          .map(artist => {
            return <Artist artist={artist} key={artist._id}></Artist>
          })
        }
        else {
          return <p>No artists match the selected criteria.</p>
        }
      }
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