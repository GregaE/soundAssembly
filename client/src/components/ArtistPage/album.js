function Album(props) {

  return (
    <div className="item">
      <a href={props.album.external_urls.spotify} target="_blank" rel="noreferrer">
        <div>
          <img src={props.album.images[0].url} alt={props.album.name} />
          <div className="item-name">
            {props.album.name}
          </div>
        </div>
      </a>
    </div>
  );
}

export default Album;