import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { Artist } from "../interfaces/Artist";

export const librarySlice = createSlice({
  name: 'library',
  initialState: {
    artists: [] as Array<Artist>,
    artistsCurrentPage: 1,
    artistsTotalPages: 1,
    artistsTotal: 0,
    artistsPageSize: 30,
  },
  reducers: {
    setArtists(state, action: PayloadAction<Array<Artist>>) {
      state.artists.push(...action.payload)
    },
  },
})

export const { setArtists } = librarySlice.actions

export default librarySlice.reducer;