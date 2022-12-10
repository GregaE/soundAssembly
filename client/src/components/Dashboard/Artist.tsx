import React from "react";
import { Link } from "react-router-dom";
import { Artist as ArtistProps } from "../../interfaces/Artist";

function ArtistInner(
  props: { artist: ArtistProps },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const backgroundUrl = props.artist.images.length ? props.artist.images[0].url : '#';
  
  return (
    <div 
      ref={ref}
      className="item"
      id={props.artist.id}
    >
      <Link to={{ pathname: `/artist/${props.artist.id}` }}>
        <div>
          <div
            className="item-image"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
          />
          <div className="item-name">
            {props.artist.name}
          </div>
        </div>
      </Link>
    </div>
  );
}

const Artist = React.forwardRef(ArtistInner);
export default Artist;