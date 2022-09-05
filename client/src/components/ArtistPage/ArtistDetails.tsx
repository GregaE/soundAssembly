import { Artist } from "../../interfaces/Artist";

function ArtistDetails(props: { artistDetails: Artist }) {

  const followersFormatted = function () {
    if (props.artistDetails.followers) {
      const followers = props.artistDetails.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return followers;
    }
  }

  const artistImage = function () {
    return (props.artistDetails.images) ? props.artistDetails.images[0].url : "";
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
        <h2>{props.artistDetails.name}</h2>
        <div>Followers: {followersFormatted()}</div>
      </div>
    </div>
  );
}

export default ArtistDetails;