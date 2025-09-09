//
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../auth/operations";

axios.defaults.baseURL = "https://bookingbackendnode.onrender.com";

// ---------------------- ADD BOOKING = addResere ----------------------
export const addReserve = createAsyncThunk(
  "booking/addReserve",
  async ({ businessId, date, time }, thunkAPI) => {
    try {
      // ✅ беремо токен з Redux або localStorage
      const state = thunkAPI.getState();
      const token = state.auth.token || localStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("No token available");
      }
      // ✅ додаємо токен в axios (універсально для всіх запитів)
      setAuthHeader(token);
      // ✅ відправляємо на бекенд
      const { data } = await axios.post("/bookings", {
        businessId,
        date,
        time,
      });

      // ⚠️ припускаю, що бекенд повертає так:
      // { status, message, data: newBooking{...} }
      if (!data || !data.data) {
        return thunkAPI.rejectWithValue("Invalid server response");
      }

      return data.data; // 👈 повертаємо об’єкт бронювання у fulfilled
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ---------------------- FETCH ALL Me Bookings ----------------------
export const fetchMeBooking = createAsyncThunk(
  "booking/fetchMeBooking",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");
      if (!token) return rejectWithValue("No token available");

      setAuthHeader(token); // додаємо токен до axios
      const { data } = await axios.get("/bookings/me");
      // сервер повертає { status, message, data: { data: [...], ...pagination } }
      //   return data.data.data; // 👈 масив бронювань
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// ---------------------- DELETE Booking ----------------------
export const deleteBooking = createAsyncThunk(
  "booking/deleteBooking",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue("No token available");

      setAuthHeader(token); // додаємо токен в headers

      await axios.delete(`/bookings/${id}`);
      return { _id: id }; // 👈 повертаємо id для видалення зі стейту
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ---------------------- CANCEL Booking ----------------------
export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async ({ id, status }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");
      if (!token) return rejectWithValue("No token available");

      setAuthHeader(token);

      // PATCH /bookings/:id/cancel
      const { data } = await axios.patch(`/bookings/${id}/cancel`, {
        id,
        status,
      });

      if (!data || !data._id) {
        return rejectWithValue("Invalid server response");
      }

      return data; // 👈 об’єкт бронювання зі status = 'cancelled'
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ---------------------- UPDATE Booking ----------------------

export const updateBooking = createAsyncThunk(
  "booking/updateBooking",
  async ({ id, date, time }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || localStorage.getItem("token");
      if (!token) return rejectWithValue("No token available");

      setAuthHeader(token);

      // PATCH /bookings/:id/update
      const { data } = await axios.patch(`/bookings/${id}/update`, {
        date,
        time,
      });

      if (!data || !data.data) {
        return rejectWithValue("Invalid server response");
      }

      return data.data; // 👈 оновлений об’єкт бронювання
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export default axios;
