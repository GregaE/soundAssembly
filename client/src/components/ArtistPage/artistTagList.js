// import { createTag } from '../../ApiService';
import ArtistTag from './artistTag'

function ArtistTagList(props) {

  function renderTags(tags) {
    if (tags && tags.length > 0) {
      return tags
        .sort(function(a,b) {
          return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
        })
        .map(tag => {
          return <ArtistTag tag={tag} key={tag.name} />
      })
    }
    else {
      return "";
    }
  }

  function renderOptions(tags) {
    if (tags && tags.length > 0) {
      return tags
        .sort(function(a,b) {
          return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
        })
        .map(tag => {
          return <option value={tag.name} key={tag.name}>{tag.name}</option>
      })
    }
    else {
      return "";
    }
  }

  console.log(props.tags)

  // function submitTag(event) {
  //   if (event.keyCode === 13) {
  //     const input = event.target.value;
  //     const newList = [...props.tags, {name: input}]
  //     props.setTags(newList);
  //     // createTag(input);
  //     event.target.value = "";
  //   }
  // }

  return (
    <div className="artistTagList">
      {renderTags(props.artistTags)}

      <label>Tag Artist:
        <input list="avail-tags"/>
      </label>
      <datalist id="avail-tags">
        {renderOptions(props.tags)}
      </datalist>
    </div>
  );
}

export default ArtistTagList;