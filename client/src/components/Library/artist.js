import { Link } from "react-router-dom";

function Artist(props) {

  return (
    <div className="artist" >
      <Link to={{
        state: { debug: 'debug'},
        pathname: `/artist/${props.artist.id}`
        }}>
        <div>
          <img src={props.artist.images[0].url} alt={props.artist.name} />
          <div className="artist-name">
            {props.artist.name}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Artist;