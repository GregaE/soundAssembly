import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { Artist } from "../interfaces/Artist";
import { getArtists } from "../ApiService";

export const fetchArtists = createAsyncThunk(
  'artists',
  async (username: string) => {
    const response = await getArtists(username)
    return response;
  }
)

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
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      if (action.payload && action.payload.length) {
        state.artists.push(...action.payload)
      }
    })
  },
})

export const { setArtists } = librarySlice.actions

export default librarySlice.reducer;