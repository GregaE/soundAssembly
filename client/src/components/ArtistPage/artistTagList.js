// import { createTag } from '../../ApiService';
import ArtistTag from './artistTag'

function ArtistTagList(props) {

  function renderTags(tags) {

    if (tags.length > 0) {
      return tags
        .sort(function(a,b) {
          return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
        })
        .map(tag => {
          return <ArtistTag tag={tag} key={tag.name} tags={props.tags} setTags={props.setTags} />
      })
    }
    else {
      return "";
    }
  }

  function submitTag(event) {
    if (event.keyCode === 13) {
      const input = event.target.value;
      const newList = [...props.tags, {name: input}]
      props.setTags(newList);
      // createTag(input);
      event.target.value = "";
    }
  }

  return (
    <div className="artistTagList">
      {/* {renderTags(props.tags)}
      <input type="text" onKeyUp={submitTag} placeholder="add tag..." /> */}
    </div>
  );
}

export default ArtistTagList;