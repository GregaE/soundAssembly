import { useAppDispatch } from "../../hooks/reduxHooks";
import { toggleTag } from '../../store/tagsSlice';
import { fetchArtists } from '../../store/librarySlice';
import { Tag } from "../../interfaces/Tag";

function SidebarTag(props: { tags: Tag[]; tag: Tag }) {
  const dispatch = useAppDispatch();
  const activeClass = () => props.tag.active ? 'active' : 'inactive';
  const setTagFilter = () => {
    dispatch(toggleTag(props.tag._id as string));
    // TO DO: fix username
    dispatch(fetchArtists('mavienajera'));
  };

  return (
    <div 
      className={ 'tag ' + activeClass() }
      onClick={ setTagFilter }
    >
      { props.tag.name }
    </div>
  );
}

export default SidebarTag;