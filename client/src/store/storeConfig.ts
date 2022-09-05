import { configureStore } from "@reduxjs/toolkit";
import { tagsSlice } from "./tagsSlice";
import { librarySlice } from "./librarySlice";
import { artistSlice } from "./artistSlice";

export const store = configureStore({
  reducer: {
    library: librarySlice.reducer,
    artist: artistSlice.reducer,
    tags: tagsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
