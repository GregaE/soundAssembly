import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { Tag } from "../interfaces/Tag";

export const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [] as Array<Tag>,
  },
  reducers: {
    addTag(state, action: PayloadAction<Tag>) {
      state.tags.push(action.payload)
    },
    setTags(state, action: PayloadAction<Array<Tag>>) {
      state.tags = action.payload
    },
    toggleTag(state, action: PayloadAction<string>) {
      state.tags = state.tags.map((tag: Tag) => {
        if (tag._id === action.payload) {
          tag.active = !tag.active;
          return tag;
        }
        return tag;
      });
      
    },
  },
})

export const {
  addTag,
  setTags,
  toggleTag,
} = tagsSlice.actions

export default tagsSlice.reducer
