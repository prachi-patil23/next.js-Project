import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMovies } from "./moviesThunk";

export interface Movie {
  id: number;
  title: string;
  poster: string;
  rating: number;
  votes: string;
  genres: string[];
}

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: "",
};

const moviesSlice = createSlice({
  name: "movies",

  initialState,

  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })

      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to load movies";
      });
  },
});

export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;