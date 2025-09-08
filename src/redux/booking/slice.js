import { createSlice } from "@reduxjs/toolkit";
import {
  addReserve,
  fetchMeBooking,
  deleteBooking,
  cancelBooking,
  updateBooking,
} from "./operations";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // --- CREATE - addReserve ---
      .addCase(addReserve.pending, state => {
        state.loading = true;
      })
      .addCase(addReserve.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addReserve.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- FETCH ---
      .addCase(fetchMeBooking.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // масив бронювань
      })
      .addCase(fetchMeBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // --- DELETE ---
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.items = state.items.filter(b => b.id !== action.payload.id);
      })

      // --- CANCEL ---
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const idx = state.items.findIndex(b => b.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = { ...state.items[idx], ...action.payload };
        }
      })

      // --- UPDATE ---
      .addCase(updateBooking.fulfilled, (state, action) => {
        const idx = state.items.findIndex(b => b.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = { ...state.items[idx], ...action.payload };
        }
      });
  },
});

export const bookingReducer = bookingSlice.reducer;
