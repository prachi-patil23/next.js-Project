import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTheatres } from "./theatreThunk";

interface Show {
  date: string;
  times: string[];
}

export interface Theatre {
  id: number;
  name: string;
  location: string;
  cancellation: string;
  shows: Show[];
}

interface TheatreState {
  theatres: Theatre[];
  loading: boolean;
  error: string;
}

const initialState: TheatreState = {
  theatres: [],
  loading: false,
  error: "",
};

const theatreSlice = createSlice({
  name: "theatres",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTheatres.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(
        fetchTheatres.fulfilled,
        (state, action: PayloadAction<Theatre[]>) => {
          state.loading = false;
          state.theatres = action.payload;
        }
      )

      .addCase(fetchTheatres.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          "Unable to fetch theatres";
      });
  },
});

export default theatreSlice.reducer;