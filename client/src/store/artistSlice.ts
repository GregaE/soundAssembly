import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { Artist } from "../interfaces/Artist";
import { Album } from "../interfaces/Album";
import { Tag } from "../interfaces/Tag";

export const artistSlice = createSlice({
  name: 'artist',
  initialState: {
    details: {} as Artist,
    albums: [] as Array<Album>,
    tags: [] as Tag[],
  },
  reducers: {
    setArtistDetails(state, action: PayloadAction<Artist>) {
      state.details = action.payload;
    },
    setArtistAlbums(state, action: PayloadAction<Array<Album>>) {
      state.albums = action.payload;
    },
    setArtistTags(state, action: PayloadAction<Array<Tag>>) {
      state.tags = action.payload;
    },
    addArtistTag(state, action: PayloadAction<Tag>) {
      state.tags.push(action.payload);
    },
    removeArtistTag(state, action: PayloadAction<Tag>) {
      state.tags = state.tags.filter((tag) => tag._id !== action.payload._id);
    },
  },
})

export const {
  setArtistDetails,
  setArtistAlbums,
  setArtistTags,
  addArtistTag,
  removeArtistTag,
} = artistSlice.actions

export default artistSlice.reducer;