import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { Artist } from "../interfaces/Artist";
import { Tag } from "../interfaces/Tag";

export const tagsSlice = createSlice({
  name: 'library',
  initialState: {
    username: "",
    artists: [] as Array<Artist>,
    artistCurrentPage: 1,
    artistTotalPages: 1,
    artistTotal: 0,
    artistPageSize: 30,
    artistTags: [] as Array<Tag>,
  },
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload
    },
    setArtists(state, action: PayloadAction<Array<Artist>>) {
      state.artists = action.payload
    },
  },
})

export const { setArtists } = tagsSlice.actions

export default tagsSlice.reducer;