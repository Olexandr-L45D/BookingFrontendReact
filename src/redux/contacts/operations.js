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

      await axios.delete(`/contacts/${contactId}`);
      return { _id: contactId }; // 👈 повертаємо id для видалення зі стейту
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ---------------------- UPDATE CONTACT ----------------------
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ contactId, phoneNumber, email, role }, thunkAPI) => {
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
      const { data } = await axios.put(`/contacts/${contactId}`, {
        phoneNumber,
        email,
        role,
      });

      // ⚠️ припускаю, що бекенд повертає так:
      // { status, message, data: {...} }
      if (!data || !data.data) {
        return thunkAPI.rejectWithValue("Invalid server response");
      }
      // Повертаємо завжди з _id
      return { ...data.data, _id: data.data._id || contactId };
      // 👈 віддаємо об’єкт оновленого контакту у fulfilled
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export default axios;

// поля для оновлення контакта =
// {
//   "name": "John Doe",
//   "phoneNumber": "555-33-11",
//   "email": "Lui_Doe123@gmail.com",
//   "role": "client"
// }
// обєкт який повертає бекнд при оновленні контакта =
// {
//   "status": 200,
//   "message": "Successfully update contact with id 65ca67e7ae7f10c88b598384!",
//   "data": {
//     "_id": "65e4decdd286b30065d54af9",
//     "name": "John Doe",
//     "phoneNumber": "222-33-11",
//     "email": "John_Doe123@gmail.com",
//     "role": "client"
//   }
// }
