import { createAsyncThunk } from "@reduxjs/toolkit";

import { getMovieById } from "../../services/mov/movie.service";

export const fetchMovieById = createAsyncThunk(
  "movieDetails/fetchMovieById",

  async (id: string, { rejectWithValue }) => {
    try {
      const movie = await getMovieById(id);

      return movie;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Unable to fetch movie"
      );
    }
  }
);