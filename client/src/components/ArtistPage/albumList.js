import Album from './album.js';

function AlbumList(props) {

  function renderAlbums(list) {
    return list.map(album => {
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