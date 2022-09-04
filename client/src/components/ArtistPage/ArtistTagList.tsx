import { createTag } from '../../ApiService';
import { tagArtist } from '../../ApiService';
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { addTag } from '../../store/tagsSlice';

import ArtistTag from './ArtistTag';
import { useState } from 'react';
import { Artist } from '../../interfaces/Artist';
import { Tag } from '../../interfaces/Tag';

function ArtistTagList(props: { 
  artistTags: Tag[];
  artistInfo: Artist;
  artistList: Artist[];
  setArtistInfo: (artistInfo: Artist) => void;
  setArtistTags: (newList: Tag[]) => void;
  setArtistList: (newList: Artist[]) => void;
  username: string;
}) {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tags.tags);

  const [inputState, setInputClass] = useState("");
  const [buttonState, setButtonClass] = useState("full");

  function renderTags(tags: Tag[]) {
    if (tags && tags.length > 0) {
      return tags
        .sort(function(a,b) {
          return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
        })
        .map(tag => {
          return <ArtistTag
            tag={tag}
            key={tag.name}
            artistTags={props.artistTags}
            artistInfo={props.artistInfo}
            setArtistInfo={props.setArtistInfo}
            setArtistTags={props.setArtistTags}
            artistList={props.artistList}
            setArtistList={props.setArtistList}
            username={props.username}
            />
      })
    }
    else {
      return "";
    }
  }

  function renderOptions(tags: Tag[]) {
    if (tags && tags.length > 0) {
      return [...tags]
        .sort(function(a,b) {
          return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
        })
        .map(tag => {
          return <option value={tag.name} key={tag.name}></option>
      })
    }
    else {
      return "";
    }
  }

  function submitTag(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13) {
      const input = (event.target as HTMLInputElement).value;
      // Prevent tagging artist twice with same tag
      if (props.artistTags.some(tag => tag.name === input.toLowerCase())) {
        alert("The tag already exists on profile")
      }
      else {
        const newArtistTags = [...props.artistInfo.artistTags, {name: input}];
        // Update DB and update artist tag list
        tagArtist(props.artistInfo.id, input, props.username);
        props.setArtistTags(newArtistTags);
        const artistInfoCopy = JSON.parse(JSON.stringify(props.artistInfo))
        artistInfoCopy.artistTags = newArtistTags;
        props.setArtistInfo(artistInfoCopy);
        // setting ArtistList need to recheck - should not be necessary
        const artistListCopy = JSON.parse(JSON.stringify(props.artistList));
        const index = artistListCopy.findIndex((artist: Artist) => artist.id === artistInfoCopy.id)
        artistListCopy[index] = artistInfoCopy;
        props.setArtistList(artistListCopy);
        // Clear input
        (event.target as HTMLInputElement).value = "";
        // Create new tag 'global' tag if it doesn't exist
        if (tags.every(tag => tag.name !== input.toLowerCase())) {
          dispatch(addTag({name: input, status: 'inactive'}))
          createTag(input, props.username);
        }
      }
    }
  }

  function toggleExpand() {
    if (inputState === "") {
      setInputClass("expanded");
      setButtonClass("sliced");
    }
    else {
      setInputClass("")
      setButtonClass("full");
    }
  }

  return (
    <div className="artistTagList">
      <div className="tag-header">Current tags:</div>
      <div className="tag-container">
        {renderTags(props.artistTags)}
      </div>
      <div className="tag-input">
        <button className={buttonState} onClick={toggleExpand}>Tag Artist</button>
        <input className={inputState} list="avail-tags" placeholder="...add tag" onKeyUp={submitTag} />
        <datalist id="avail-tags">
          {renderOptions(tags)}
        </datalist>
      </div>
    </div>
  );
}

export default ArtistTagList;