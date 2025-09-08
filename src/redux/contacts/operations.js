// contacts - operattions
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../auth/operations";

axios.defaults.baseURL = "https://bookingbackendnode.onrender.com";
// // Utility to translateText
// const translateText = async (text, targetLanguage) => {
//   if (!text || text.trim() === "") {
//     console.warn("Немає тексту для перекладу");
//     return text;
//   }

//   // Додаємо перевірку на наявність спецсимволів (email, числа, ім'я без пробілів)
//   if (
//     text.includes("@") ||
//     /^\d+$/.test(text) ||
//     text.split(" ").length === 1
//   ) {
//     console.warn("Можливо, це ім'я, число або email. Пропускаємо переклад.");
//     return text;
//   }

//   try {
//     const response = await fetch(
//       `https://lingva.ml/api/v1/translate/en/${targetLanguage}/${encodeURIComponent(
//         text
//       )}`
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP помилка! Статус: ${response.status}`);
//     }

//     const data = await response.json();

//     if (!data || !data.translation) {
//       console.error("Помилка перекладу: некоректні дані від API", data);
//       return text;
//     }

//     return data.translation;
//   } catch (error) {
//     console.error("Помилка запиту:", error);
//     return text;
//   }
// };

// ---------------------- ADD CONTACT ----------------------

// export const addContact = createAsyncThunk(
//   "contacts/addContact",
//   async (newContact, { getState, rejectWithValue }) => {
//     try {
//       // const token = getState().auth.token;
//       const token = getState().auth.token || localStorage.getItem("token");
//       if (!token) return rejectWithValue("No token available");
//       setAuthHeader(token); // додаємо токен до axios

//       const response = await axios.post("/contacts", newContact);
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e.message);
//     }
//   }
// );

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

// POST /contacts
// export const addContact = createAsyncThunk(
//   "contacts/addContact",
//   async (contact, thunkAPI, { getState, rejectWithValue }) => {
//     try {
//       // const token = getState().auth.token;
//       const token = getState().auth.token || localStorage.getItem("token");
//       if (!token) return rejectWithValue("No token available");
//       setAuthHeader(token); // додаємо токен до axios
//       const { data } = await axios.post("/contacts", contact);
//       // сервер повертає { status, message, contact: {...} }
//       return data.contact; // 👈 один об'єкт
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
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
// ---------------------- FETCH ALL CONTACTS ----------------------
// const token = getState().auth.token || localStorage.getItem('token');
// цей запис означає беру токен або зі стану в Redax або з локалсторедж
// export const fetchContact = createAsyncThunk(
//   "contacts/fetchAll",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       // const token = getState().auth.token;
//       const token = getState().auth.token || localStorage.getItem("token");
//       if (!token) return rejectWithValue("No token available");

//       setAuthHeader(token); // додаємо токен до axios

//       // const response = await axios.get("/contacts");
//       // const contacts = response.data;
//       const { data } = await axios.get("/contacts");
//       // сервер повертає { status, message, data: { data: [...], ...pagination } }
//       return data.data.data; // 👈 масив контактів

//       // Якщо потрібно, перекладаємо контакти
//       // const currentLanguage = getState().language || "en";
//       // if (currentLanguage === "en") return contacts;

//       // const translatedContacts = await Promise.all(
//       //   contacts.map(async contact => ({
//       //     ...contact,
//       //     name: await translateText(contact.name, currentLanguage),
//       //   }))
//       // );

//       // return translatedContacts;

//     } catch (e) {
//       return rejectWithValue(e.message);
//     }
//   }
// );
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
      return { id: contactId }; // 👈 повертаємо id для видалення зі стейту
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// return { id: contactId }; // 👈 повертаємо id для видалення зі стейту
export default axios;

// // Функція для отримання контактів з бекенду і перекладу їх
// export const fetchContact = createAsyncThunk(
//   "contacts/fetchAll",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const response = await axios.get("/contacts");
//       const contacts = response.data;

//       // Отримуємо поточну мову з Redux (з дефолтним значенням)
//       const currentLanguage = getState().language || "en";

//       if (currentLanguage === "en") {
//         return contacts; // Якщо англійська, не перекладаємо
//       }

//       // Перекладемо усі контакти на поточну мову
//       const translatedContacts = await Promise.all(
//         contacts.map(async contact => ({
//           ...contact,
//           name: await translateText(contact.name, currentLanguage),
//         }))
//       );

//       return translatedContacts;
//     } catch (e) {
//       return rejectWithValue(e.message);
//     }
//   }
// );

// axios.defaults.baseURL = "https://66ea54bb55ad32cda478635a.mockapi.io";
// axios.defaults.baseURL = "https://connections-api.goit.global/";

// export const fetchContact = createAsyncThunk(
//   "contacts/fetchAll",
//   // in fetchContact Використовуємо символ підкреслення як ім'я першого параметра, тому що в цій операції він нам не потрібен ( а пусто не можна залишати!)
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("/contacts");
//       // При успішному запиті повертаємо проміс із даними з бекенду
//       return response.data;
//     } catch (e) {
//       // При помилці запиту повертаємо проміс, який буде відхилений з текстом помилки
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );
// axios.defaults.baseURL = "https://bookingbackendnode.onrender.com";
// addContact
// export const addContact = createAsyncThunk(
//   "contacts/addContact",
//   async (newContact, thunkAPI) => {
//     try {
//       const response = await axios.post("/contacts", newContact);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const addContact = createAsyncThunk(
//   "contacts/addContact",
//   async (newContact, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState();
//       const token = state.auth.token; // перевір, чи зберігаєш його тут
//       if (token) {
//         axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//       }

//       const response = await axios.post("/contacts", newContact);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// // /contacts/{contactId}
// export const deleteContact = createAsyncThunk(
//   "contacts/deleteContact",
//   async (contactId, thunkAPI) => {
//     try {
//       const res = await axios.delete(`/contacts/${contactId}`);
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const res = await axios.delete('/contacts/{contactId}');
//тут в фалі запитів це оголошення 3 операції (1-ша - запит на базовий УРЛ для відмалювання всих контактів - axios.defaults.baseURL, addContact, deleteContact)
// "tasks/fetchAll/pending" - початок запиту
// "tasks/fetchAll/fulfilled" - успішне завершення запиту
// "tasks/fetchAll/rejected" - завершення запиту з помилкою
// початковий варіант запиту без відпрацювання станів з помилками:
// export const fetchTasks = createAsyncThunk("contacts/fetchAll", async () => {
//     const response = await axios.get("/contacts");
//     return response.data;
// });

// deleteContact При успішному запиті повертаємо проміс із даними з бекенду для видалення шукаєм по id - contactId
// (ця не працює а верхня з шаблонним рядком і зн долар працює (`/contacts/${contactId}`))
// export const deleteContact = createAsyncThunk("contacts/deleteContact",
//     async (contactId, thunkAPI) => {
//         try {
//             const response = await axios.delete("/contacts", { contactId });
//             return response.data;
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e.message);
//         }
//     }
// );
