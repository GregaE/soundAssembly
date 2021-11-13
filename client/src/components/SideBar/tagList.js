import { createTag } from '../../ApiService';
import Tag from './tag'

function TagList(props) {

  function renderTags(tags) {
    if (tags.length > 0) {
      return tags
        .sort(function(a,b) {
          return (a.toLowerCase() < b.toLowerCase()) ? -1 : 1;
        })
        .map(tag => {
          return <Tag
            tag={tag}
            key={tag}
            artistList={props.artistList}
            setArtistList={props.setArtistList}>
            </Tag>
      })
    }
    else {
      return "";
    }
  }

  function submitTag(event) {
    if (event.keyCode === 13) {
      const input = event.target.value;
      const newList = [...props.tags, input]
      props.setTags(newList);
      createTag(input);
      event.target.value = "";
    }
  }

  return (
    <div className="tagList">
      {renderTags(props.tags)}
      <input type="text" onKeyUp={submitTag} placeholder="add tag..." />
    </div>
  );
}

export default TagList;