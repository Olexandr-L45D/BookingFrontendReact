// contacts - operattions
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global/";

const translateText = async (text, targetLanguage) => {
  if (!text || text.trim() === "") {
    console.warn("Немає тексту для перекладу");
    return text;
  }

  // Додаємо перевірку на наявність спецсимволів (email, числа, ім'я без пробілів)
  if (
    text.includes("@") ||
    /^\d+$/.test(text) ||
    text.split(" ").length === 1
  ) {
    console.warn("Можливо, це ім'я, число або email. Пропускаємо переклад.");
    return text;
  }

  try {
    const response = await fetch(
      `https://lingva.ml/api/v1/translate/en/${targetLanguage}/${encodeURIComponent(
        text
      )}`
    );

    if (!response.ok) {
      throw new Error(`HTTP помилка! Статус: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.translation) {
      console.error("Помилка перекладу: некоректні дані від API", data);
      return text;
    }

    return data.translation;
  } catch (error) {
    console.error("Помилка запиту:", error);
    return text;
  }
};

// Функція для перекладу тексту (з підтримкою обробки помилок)
// const translateText = async (text, targetLanguage) => {
//   try {
//     const response = await fetch("https://libretranslate.com/translate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         q: text,
//         source: "auto",
//         target: targetLanguage,
//         format: "text",
//         api_key: "YOUR_API_KEY", // Тут вставте реальний ключ
//       }),
//     });

//     const data = await response.json();
//     return data.translatedText;
//   } catch (error) {
//     console.error("Translation API error:", error);
//     return null;
//   }
// };

// const translateText = async (text, targetLanguage) => {
//   if (!text || text.trim() === "") {
//     console.warn("Немає тексту для перекладу");
//     return text; // Повертаємо вихідний текст, щоб уникнути помилки
//   }

//   try {
//     const response = await fetch(
//       `https://lingva.ml/api/v1/translate/en/${targetLanguage}/${encodeURIComponent(
//         text
//       )}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           q: text,
//           source: "en",
//           target: targetLanguage,
//           format: "text",
//         }),
//       }
//     );

//     const data = await response.json();

//     if (!data || !data.translatedText) {
//       console.error("Помилка перекладу: некоректні дані від API", data);
//       return text;
//     }

//     return data.translatedText;
//   } catch (error) {
//     console.error("Помилка запиту:", error);
//     return text;
//   }
// };

// Функція для отримання контактів з бекенду і перекладу їх
export const fetchContact = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get("/contacts");
      const contacts = response.data;

      // Отримуємо поточну мову з Redux (з дефолтним значенням)
      const currentLanguage = getState().language || "en";

      if (currentLanguage === "en") {
        return contacts; // Якщо англійська, не перекладаємо
      }

      // Перекладемо усі контакти на поточну мову
      const translatedContacts = await Promise.all(
        contacts.map(async contact => ({
          ...contact,
          name: await translateText(contact.name, currentLanguage),
        }))
      );

      return translatedContacts;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

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

// addContact
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", newContact);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const res = await axios.delete(`/contacts/${contactId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
