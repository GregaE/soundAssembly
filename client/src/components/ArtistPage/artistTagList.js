// import { createTag } from '../../ApiService';
import { tagArtist } from '../../ApiService';
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

  function submitTag(event) {
    if (event.keyCode === 13) {
      const input = event.target.value;
      const newArtistTags = [...props.artistInfo.artistTags, {name: input}];
      tagArtist(input, props.artistInfo.id);
      props.setArtistTags(newArtistTags);
      event.target.value = "";
    }
  }

  return (
    <div className="artistTagList">
      {renderTags(props.artistTags)}
      <label>Tag Artist:
        <input list="avail-tags" onKeyUp={submitTag} />
      </label>
      <datalist id="avail-tags">
        {renderOptions(props.tags)}
      </datalist>
    </div>
  );
}

export default ArtistTagList;