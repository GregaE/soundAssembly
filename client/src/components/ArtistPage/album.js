import play from '../../play-button.png';

function Album(props) {

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
            {props.album.name}
          </div>
        </div>
      </a>
    </div>
  );
}

export default Album;