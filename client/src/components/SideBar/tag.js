function Tag({artistList, setArtistList, tag}) {

  function filterArtists(event) {
    // if active/inactive condition
    const filteredList = artistList
    .filter(artist => artist.artistTags
      .some(tag => tag === event.target.innerText));
    console.log(filteredList)
    setArtistList(filteredList)
  }

  return (
    <div className="tag" onClick={filterArtists}>
      {tag}
    </div>
  );
}

export default Tag;