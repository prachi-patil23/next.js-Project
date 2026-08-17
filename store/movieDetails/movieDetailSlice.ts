import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMovieById } from "./movieDetailThunk";

export interface Movie {
  id: number;
  title: string;
  poster: string;
  rating: number;
  votes: string;
  genres: string[];
}

interface MovieDetailState {
  movie: Movie | null;
  loading: boolean;
  error: string;
}

const initialState: MovieDetailState = {
  movie: null,
  loading: false,
  error: "",
};

const movieDetailSlice = createSlice({
  name: "movieDetails",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(
        fetchMovieById.fulfilled,
        (state, action: PayloadAction<Movie>) => {
          state.loading = false;
          state.movie = action.payload;
        }
      )

      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          "Movie not found";
      });
  },
});

export default movieDetailSlice.reducer;