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
  },
})

export const { addTag, setTags } = tagsSlice.actions

export default tagsSlice.reducer
