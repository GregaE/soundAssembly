import { configureStore } from "@reduxjs/toolkit";
import { tagsSlice } from "./tagsSlice";
import { librarySlice } from "./librarySlice";
import { artistSlice } from "./artistSlice";
import { userSlice } from "./userSlice";

export const store = configureStore({
  reducer: {
    library: librarySlice.reducer,
    artist: artistSlice.reducer,
    tags: tagsSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
