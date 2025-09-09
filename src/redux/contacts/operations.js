// contacts - operattions
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../auth/operations";

axios.defaults.baseURL = "https://bookingbackendnode.onrender.com";

// ---------------------- ADD CONTACT ----------------------
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, phoneNumber, email, role }, thunkAPI) => {
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
      const { data } = await axios.post("/contacts", {
        name,
        phoneNumber,
        email,
        role,
      });

      // ⚠️ припускаю, що бекенд повертає так:
      // { status, message, contact: {...} }
      if (!data || !data.contact) {
        return thunkAPI.rejectWithValue("Invalid server response");
      }

      return data.contact; // 👈 віддаємо об’єкт контакту у fulfilled
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ---------------------- FETCH ALL CONTACTS ----------------------
export const fetchContact = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      // const token = getState().auth.token;
      const token = getState().auth.token || localStorage.getItem("token");
      if (!token) return rejectWithValue("No token available");

      setAuthHeader(token); // додаємо токен до axios

      // const response = await axios.get("/contacts");
      // const contacts = response.data;
      const { data } = await axios.get("/contacts");
      // сервер повертає { status, message, data: { data: [...], ...pagination } }
      return data.data.data; // 👈 масив контактів
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// ---------------------- DELETE CONTACTS ----------------------
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue("No token available");

      setAuthHeader(token); // додаємо токен в headers

      // const res = await axios.delete(`/contacts/${contactId}`);
      // return res.data;
      await axios.delete(`/contacts/${contactId}`);
      return { _id: contactId }; // 👈 повертаємо id для видалення зі стейту
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// return { _id: contactId }; //  повертаємо id для видалення зі стейту
export default axios;
