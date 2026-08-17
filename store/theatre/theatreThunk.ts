import { createAsyncThunk } from "@reduxjs/toolkit";

import { getTheatres } from "../../services/theatres/theatre.service";

export const fetchTheatres = createAsyncThunk(
  "theatres/fetchTheatres",

  async (_, { rejectWithValue }) => {
    try {
      const theatres = await getTheatres();

      return theatres;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Unable to fetch theatres"
      );
    }
  }
);