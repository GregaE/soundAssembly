import { createTag } from '../../ApiService';
import Tag from './Tag'

function TagList(props) {

  function renderTags(tags) {
    if (tags && tags.length > 0) {
      return tags
        .sort(function(a,b) {
          return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
        })
        .map(tag => {
          return <Tag tag={tag} key={tag.name} tags={props.tags} setTags={props.setTags} />
      })
    }
    else {
      return "";
    }
  }

  async function submitTag(event) {
    if (event.keyCode === 13) {
      const input = event.target.value;
      const newList = [...props.tags, {name: input, status: 'inactive'}]
      await createTag(input, props.username);
      props.setTags(newList);
      event.target.value = "";
    }
  }

  return (
    <div className="tagList-container">
      <p>Filter via tag:</p>
      <div className="tagList">
        {renderTags(props.tags)}
        <input type="text" onKeyUp={submitTag} placeholder="add tag..." />
      </div>
    </div>
  );
}

export default TagList;