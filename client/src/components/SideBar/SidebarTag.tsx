import { useAppDispatch } from "../../hooks/reduxHooks";
import { setTags } from '../../store/tagsSlice';
import { Tag } from "../../interfaces/Tag";

function SidebarTag(props: { tags: Tag[]; tag: Tag }) {
  const dispatch = useAppDispatch();

  function toggleTag() {
    const newArray = props.tags.map(tag => {
      if (tag.name === props.tag.name) {
        if (props.tag.status === 'inactive') {
          return {...{
            name: tag.name,
            status: "active"
          }}
        }
        else {
          return {...{
            name: tag.name,
            status: "inactive"
          }}
        }
      }
      else {
        return {...tag}
      }
    })

    dispatch(setTags(newArray as Tag[]))
  }

  const tagClass = `tag ${props.tag.status}`

  return (
    <div className={tagClass} onClick={toggleTag}>
      {props.tag.name}
    </div>
  );
}

export default SidebarTag;