import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { Artist } from "../interfaces/Artist";
import { getArtists } from "../ApiService";
import { Tag } from "../interfaces/Tag";

export const fetchArtists = createAsyncThunk(
  'artists',
  async (_, { getState }) => {
    const { library, tags } = getState() as { 
      library: { artistsPageSize: number, artistsCurrentPage: number },
      tags: { tags: Array<Tag> }
    };
    const tagFilters = tags.tags?.reduce((acc, curr) => {
      if (curr.active) acc.push(curr.name);
      return acc;
    }, [] as Array<string>);
    const response = await getArtists(
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
    status: 'idle',
    error: null as string | null | undefined,
    artistsCurrentPage: 0,
    artistsTotalPages: 1,
    artistsTotal: 0,
    artistsPageSize: 30,
  },
  reducers: {
    setArtists(state, action: PayloadAction<Array<Artist>>) {
      state.artists.push(...action.payload)
    },
    incrementCurrentPage(state) {
      state.artistsCurrentPage++
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.artistsTotalPages = action.payload;
    },
    resetArtists(state) {
      state.artists = [];
      state.artistsCurrentPage = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload && action.payload.length) {
          state.artists.push(...action.payload);
        }
        console.log('hey')
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const {
  setArtists,
  incrementCurrentPage,
  setTotalPages,
  resetArtists,
} = librarySlice.actions

export default librarySlice.reducer;