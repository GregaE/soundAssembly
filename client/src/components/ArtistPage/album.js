import play from '../../assets/play-button.png';

function Album(props) {

  const releaseYear = props.album.release_date.slice(0, 4)

  return (
    <div className="item">
      <a href={props.album.external_urls.spotify} target="_blank" rel="noreferrer">
        <div>
          <div
            className="item-image"
            style={{ backgroundImage: `url(${props.album.images[0].url})` }}
          >
            <img src={play} alt="play-button" />
          </div>
          <div className="item-name">
            <p>{props.album.name} ({releaseYear})</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Album;