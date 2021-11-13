import { Link } from "react-router-dom";

function Artist(props) {

  return (
    <div className="item" id={props.artist.id}>
      <Link to={{
        state: { debug: 'debug'},
        pathname: `/artist/${props.artist.id}`
        }}>
        <div>
          <img src={props.artist.images[0].url} alt={props.artist.name} />
          <div className="item-name">
            {props.artist.name}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Artist;