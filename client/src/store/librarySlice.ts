import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { Artist } from "../interfaces/Artist";
import { getArtists } from "../ApiService";
import { Tag } from "../interfaces/Tag";

export const fetchArtists = createAsyncThunk(
  'artists',
  async (username: string, { getState }) => {
    const { library, tags } = getState() as { 
      library: { artistsPageSize: number, artistsCurrentPage: number },
      tags: { tags: Array<Tag> }
    };
    const tagFilters = tags.tags?.reduce((acc, curr) => {
      if (curr.active) acc.push(curr.name);
      return acc;
    }, [] as Array<string>);
    const response = await getArtists(
      username,
      library.artistsPageSize,
      library.artistsCurrentPage,
      tagFilters
    )
    return response;
  }
)

export const librarySlice = createSlice({
  name: 'library',
  initialState: {
    artists: [] as Array<Artist>,
    artistsCurrentPage: 0,
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
        state.artists = action.payload;
      }
    })
  },
})

export const { setArtists } = librarySlice.actions

export default librarySlice.reducer;