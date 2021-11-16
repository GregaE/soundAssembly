import Album from './album.js';

function AlbumList(props) {

  function renderAlbums(list) {
    return list
      // spotify has duplicated albums in their API, this removes albums with the same name
      .filter((album, pos, list) => {
        return list.map(map => map.name).indexOf(album.name) === pos
      })
      .map(album => {
      return <Album album={album} key={album.id}></Album>
      })
  }

  // Render buffer to left-align items in last row (flexbox)
  function renderBuffer(n) {
    if(props.albumList && props.albumList.length > 2) {
      const bufferList = []
      for (let i = 0; i < n; i++) {
        const el = <div className="item buffer" key={i} />;
        bufferList.push(el);
      }
      return bufferList;
    }
  }

  return (
    <div className="album-container">
      {renderAlbums(props.albumList)}
      {renderBuffer(7)}
    </div>
  );
}

export default AlbumList;