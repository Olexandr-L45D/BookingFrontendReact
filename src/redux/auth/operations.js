// auth - autorizations
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://bookingbackendnode.onrender.com";

// Utility to add JWT - (token)
export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT - token
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

// ---------------------- REGISTER ----------------------
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", credentials);
      const accessToken = response.data.data.accessToken;

      // Зберігаємо токен в localStorage та axios
      localStorage.setItem("token", accessToken);
      setAuthHeader(accessToken);

      // Повертаємо у зручному форматі для slice
      return {
        user: response.data.data.user || null,
        token: accessToken,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ---------------------- LOGIN ----------------------
export const logIn = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", userInfo);
      const accessToken = response.data.data.accessToken;

      // Зберігаємо токен в localStorage та axios
      localStorage.setItem("token", accessToken);
      setAuthHeader(accessToken);

      // Повертаємо у зручному форматі для slice
      return {
        user: response.data.data.user || null,
        token: accessToken,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /auth/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    // After a successful logout, remove the token from the HTTP header
    // ✅ При логауті очищаємо токен
    localStorage.removeItem("token");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/me
 * headers: Authorization: Bearer token
 */

// ---------------------- REFRESH USER ----------------------
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token || localStorage.getItem("token");

    if (!token) return thunkAPI.rejectWithValue("No token");

    // ✅ Підставляємо accessToken у хедер
    setAuthHeader(token);

    try {
      const { data } = await axios.get("/auth/refresh");
      return {
        user: data.data?.user || null,
        token, // залишаємо той самий accessToken
      };
    } catch (err) {
      // Якщо токен не валідний — чистимо localStorage і так само додав чистку в слайсах!!!
      localStorage.removeItem("token");
      clearAuthHeader();
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to refresh"
      );
    }
  }
);

export default axios;
