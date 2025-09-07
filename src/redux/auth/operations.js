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
// POST @/auth/register
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", credentials);
      // After successful registration, add the token to the HTTP header
      // після отримання data при login/register
      localStorage.setItem("token", response.data.token);

      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /auth/login
 * body: { email, password } = credentials
 */
export const logIn = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/login", userInfo);
      // After successful login, add the token to the HTTP header
      localStorage.setItem("token", data.token);
      setAuthHeader(data.token);
      return data;
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
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/me
 * headers: Authorization: Bearer token
 */
// auth/operations.js
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token || localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token");

    setAuthHeader(token);
    try {
      const { data } = await axios.get("/auth/refresh"); // або /auth/current
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export default axios;

// export const refreshUser = createAsyncThunk(
//   "auth/refresh",
//   async (_, thunkAPI) => {
//     const reduxState = thunkAPI.getState();
//     setAuthHeader(reduxState.auth.token);
//     const response = await axios.get("/auth/refresh");
//     return response.data;
//   },
//   {
//     condition: (_, thunkAPI) => {
//       const reduxState = thunkAPI.getState();
//       return reduxState.auth.token !== null;
//     },
//   }
// );

// приклад нижче ( з умовою)
// export const refreshUser = createAsyncThunk(
//     'auth/refresh',
//     async (_, thunkAPI) => {
//         // Reading the token from the state via getState()
//         const state = thunkAPI.getState();
//         const persistedToken = state.auth.token;

//         if (persistedToken === null) {
//             // If there is no token, exit without performing any request
//             return thunkAPI.rejectWithValue('Unable to fetch user');
//         }

//         try {
//             // If there is a token, add it to the HTTP header and perform the request
//             setAuthHeader(persistedToken);
//             const { data } = await axios.get('/users/me');
//             return data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );
