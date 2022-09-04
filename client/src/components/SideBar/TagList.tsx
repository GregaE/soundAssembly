import { createTag } from '../../ApiService';
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { addTag } from '../../store/tagsSlice';
import SidebarTag from './SidebarTag'
import { Tag } from '../../interfaces/Tag';

function TagList(props: { username: string; }) {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags.tags);

  function renderTags(tags: Tag[]) {
    if (tags && tags.length > 0) {
      return [...tags]
        .sort(function(a,b) {
          return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
        })
        .map(tag => {
          return <SidebarTag tag={tag} key={tag.name} tags={tags} />
      })
    }
    else {
      return "";
    }
  }

  async function submitTag(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13) {
      const input = (event.target as HTMLInputElement).value;
      await createTag(input, props.username);
      dispatch(addTag({name: input, status: 'inactive'} as Tag));
      (event.target as HTMLInputElement).value = "";
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