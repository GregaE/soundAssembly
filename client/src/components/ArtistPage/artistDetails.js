function ArtistDetails(props) {

  const noOfFollowers = function () {
    return (props.artistInfo.followers) ? props.artistInfo.followers.total : "";
  }

  const artistImage = function () {
    return (props.artistInfo.images) ? props.artistInfo.images[0].url : "";
  }

  return (
    <div className="artist-details">
      <div>
        <img src={artistImage()} alt={props.artistInfo.name} />
      </div>
      <div>
        <h2>{props.artistInfo.name}</h2>
        <div>Followers: {noOfFollowers()}</div>
        <button>Tag</button>
      </div>
    </div>
  );
}

export default ArtistDetails;