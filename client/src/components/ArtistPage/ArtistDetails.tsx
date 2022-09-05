import { useAppSelector } from "../../hooks/reduxHooks";

function ArtistDetails() {

  const artistDetails = useAppSelector((state) => state.artist.details);

  const followersFormatted = function () {
    if (artistDetails.followers) {
      const followers = artistDetails.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return followers;
    }
  }

  const artistImage = function () {
    return (artistDetails.images) ? artistDetails.images[0].url : "";
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
        <h2>{artistDetails.name}</h2>
        <div>Followers: {followersFormatted()}</div>
      </div>
    </div>
  );
}

export default ArtistDetails;