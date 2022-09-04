import { Artist } from "../../interfaces/Artist";

function ArtistDetails(props: { artistInfo: Artist }) {

  const followersFormatted = function () {
    if (props.artistInfo.followers) {
      const followers = props.artistInfo.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return followers;
    }
  }

  const artistImage = function () {
    return (props.artistInfo.images) ? props.artistInfo.images[0].url : "";
  }

  return (
    <div className="artist-details">
      <div
        className="artist-img"
        style={{ backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0.6)
        ), url(${artistImage()})` }}
      >
        <h2>{props.artistInfo.name}</h2>
        <div>Followers: {followersFormatted()}</div>
      </div>
    </div>
  );
}

export default ArtistDetails;