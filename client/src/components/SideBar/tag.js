function Tag(props) {

  function toggleTag() {
    const newArray = props.tags.map(tag => {
      if (tag.name === props.tag.name) {
        if (props.tag.status === 'inactive') {
          return {...{
            name: tag.name,
            status: "active"
          }}
        }
        else {
          return {...{
            name: tag.name,
            status: "inactive"
          }}
        }
      }
      else {
        return {...tag}
      }
    })

    props.setTags(newArray)
  }

  const tagClass = `tag ${props.tag.status}`

  return (
    <div className={tagClass} onClick={toggleTag}>
      {props.tag.name}
    </div>
  );
}

export default Tag;