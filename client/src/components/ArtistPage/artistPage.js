import {useParams, useLocation} from "react-router-dom";

function ArtistPage(props) {
  const {artistId} = useParams();

  return (
    <div className="artistPage">
      Artist Name: {artistId}
    </div>
  );
}

export default ArtistPage;