import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { Artist } from "../interfaces/Artist";

export const librarySlice = createSlice({
  name: 'library',
  initialState: {
    artists: [] as Array<Artist>,
    artistCurrentPage: 1,
    artistTotalPages: 1,
    artistTotal: 0,
    artistPageSize: 30,
  },
  reducers: {
    setArtists(state, action: PayloadAction<Array<Artist>>) {
      state.artists = action.payload
    },
  },
})

export const { setArtists } = librarySlice.actions

export default librarySlice.reducer;