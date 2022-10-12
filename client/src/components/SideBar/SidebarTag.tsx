import { useAppDispatch } from "../../hooks/reduxHooks";
import { toggleTag } from '../../store/tagsSlice';
import { Tag } from "../../interfaces/Tag";

function SidebarTag(props: { tags: Tag[]; tag: Tag }) {
  const dispatch = useAppDispatch();
  const activeClass = () => props.tag.active ? 'active' : 'inactive';

  return (
    <div 
      className={ 'tag ' + activeClass() }
      onClick={ () => dispatch(toggleTag(props.tag._id as string)) }
    >
      { props.tag.name }
    </div>
  );
}

export default SidebarTag;