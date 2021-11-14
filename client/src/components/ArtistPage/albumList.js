import Album from './album.js';

function AlbumList(props) {

  function renderAlbums(list) {
    console.log(list)
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
      {renderAlbums(props.albumList)}
    </div>
  );
}

export default AlbumList;