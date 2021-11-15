import { Link } from "react-router-dom";

function Artist(props) {

  return (
    <div className="item" id={props.artist.id}>
      <Link to={{
        state: { debug: 'debug'},
        pathname: `/artist/${props.artist.id}`
        }}>
        <div>
          <div
            className="item-image"
            style={{ backgroundImage: `url(${props.artist.images[0].url})` }}
          />
          <div className="item-name">
            {props.artist.name}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Artist;