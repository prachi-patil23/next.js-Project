import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user/userSlice";
import moviesReducer from "./movie/moviesSlice";
import movieDetailsReducer from "./movieDetails/movieDetailSlice";
import theatreReducer from "./theatre/theatreSlice";

export const reduxStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
    theatres: theatreReducer,
  },
});

export type RootState =
  ReturnType<typeof reduxStore.getState>;

export type AppDispatch =
  typeof reduxStore.dispatch;