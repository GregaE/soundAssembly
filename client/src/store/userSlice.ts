import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    displayName: '',
    accessToken: '',
    refreshToken: '',
    expiresIn: 0,
  },
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setDisplayName(state, action: PayloadAction<string>) {
      state.displayName = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
    },
    setExpiresIn(state, action: PayloadAction<number>) {
      state.expiresIn = action.payload as number;
    },
  },
})

export const { 
  setUsername,
  setDisplayName,
  setAccessToken,
  setRefreshToken,
  setExpiresIn,
} = userSlice.actions

export default userSlice.reducer