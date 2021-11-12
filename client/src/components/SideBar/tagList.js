import Tag from './tag'

function TagList(props) {

  function renderTags(tags) {
    if (tags.length > 0) {
      return tags
        .sort(function(a,b) {
          return (a.toLowerCase() < b.toLowerCase()) ? -1 : 1;
        })
        .map(tag => {
          return <Tag tag={tag} key={tag}></Tag>
      })
    }
    else {
      return "";
    }
  }

  function submitTag(event) {
    if (event.keyCode === 13) {
      const newList = [...props.tags, event.target.value]
      props.setTags(newList);
    }
  }

  return (
    <div className="tagList">
      {renderTags(props.tags)}
      <input onKeyUp={submitTag} placeholder="add tag..." type="text" />
    </div>
  );
}

export default TagList;