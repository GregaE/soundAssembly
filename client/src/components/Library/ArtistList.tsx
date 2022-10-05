import { useAppSelector } from "../../hooks/reduxHooks";
import { Artist as ArtistInterface } from "../../interfaces/Artist";
import Artist from './Artist';

function ArtistList(props: { username: any; artistList: ArtistInterface[]; }) {
  const tags = useAppSelector((state) => state.tags.tags);

  function renderArtists(list: ArtistInterface[]) {
    if (list.length > 0) {
      // when no tag filters are applied show all artists
      if (tags.every(tag => tag.status === "inactive")) {
        return list
          .sort(function(a,b) {
            return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
          })
          .map(artist => {
            return <Artist artist={artist} key={artist._id} />
        })
      }
      else {
        const filteredList = list
          .filter(artist => artist.artistTags
            .some(artistTag => tags
              .filter(tag => tag.status !== "inactive")
              .some(tag => tag.name === artistTag.name)))
        if (filteredList.length > 0) {
          return filteredList.sort(function(a,b) {
            return (a.name < b.name) ? -1 : 1;
          })
          .map(artist => {
            return <Artist artist={artist} key={artist._id} />
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
      <h2>Artists</h2>
      <div className="artist-list">
        {renderArtists(props.artistList)}
      </div>
    </div>
  );
}

export default ArtistList;