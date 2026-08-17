import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMovies } from "../../services/mov/movie.service";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMovies();

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch movies"
      );
    }
  }
);