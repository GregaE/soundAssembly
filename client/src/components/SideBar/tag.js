function Tag(props) {

  function toggleTag() {
    const newArray = props.tags.map(tag => {
      if (tag.name === props.tag.name) {
        return {...{
          name: tag.name,
          status: "active"
        }}
      }
      else {
        return {...tag}
      }
    })


    if (props.tag.status === 'inactive') {
      props.setTags(newArray)
    }
    // else {

    // }
  }


  function filterArtists(event) {
    // if active/inactive condition
    // if(!isActive) {
    //   artistList
    //     .filter(artist => !artist.artistTags
    //       .some(tag => tag === event.target.innerText))
    //   // setArtistList(filteredList)
    //   toggleActive(true)
    //   event.target.classList.add('active')
    // }
    // else {
    //   artistList
    //     .filter(artist => !artist.artistTags
    //       .some(tag => tag === event.target.innerText))
    //     .forEach(artist => document.getElementById(artist.id).classList.remove(`hide`));
    //   toggleActive(false)
    //   event.target.classList.remove('active')
    // }
  }

  const tagClass = `tag ${props.tag.status}`

  return (
    <div className={tagClass} onClick={toggleTag}>
      {props.tag.name}
    </div>
  );
}

export default Tag;