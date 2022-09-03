import { createTag } from '../../ApiService';
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { addTag, setTags } from '../../store/tagsSlice';
import Tag from './Tag'

function TagList(props) {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags.tags);

  function renderTags(tags) {
    if (tags && tags.length > 0) {
      return [...tags]
        .sort(function(a,b) {
          return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
        })
        .map(tag => {
          return <Tag tag={tag} key={tag.name} tags={tags} />
      })
    }
    else {
      return "";
    }
  }

  async function submitTag(event) {
    if (event.keyCode === 13) {
      const input = event.target.value;
      const newList = [...tags, {name: input, status: 'inactive'}]
      await createTag(input, props.username);
      dispatch(setTags(newList))
      event.target.value = "";
    }
  }

  return (
    <div className="tagList-container">
      <p>Filter via tag:</p>
      <div className="tagList">
        {renderTags(tags)}
        <input type="text" onKeyUp={submitTag} placeholder="add tag..." />
      </div>
    </div>
  );
}

export default TagList;