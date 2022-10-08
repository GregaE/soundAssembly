import Album from "./Album";
import { Album as AlbumInferface } from "../../interfaces/Album";
import { useAppSelector } from "../../hooks/reduxHooks";

function AlbumList() {

  const albumList = useAppSelector((state) => state.artist.albums);

  function renderAlbums(list: Array<AlbumInferface>) {
    return list
      // spotify has duplicated albums in their API, this removes albums with the same name
      .filter((album, pos, list) => {
        return list.map(map => map.name).indexOf(album.name) === pos
      })
      .map(album => {
      return <Album album={album} key={album.id}></Album>
      })
  }

  return (
    <div className="album-container">
      {renderAlbums(albumList)}
    </div>
  );
}

export default AlbumList;