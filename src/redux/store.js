// store

import { configureStore } from "@reduxjs/toolkit";
import tasksReducerCard from "./contacts/slice";
import { filtersReducer } from "./filters/slice";
import { authReducer } from "./auth/slice";
import languageReducer from "./sliceLanguage"; // Додаємо сюди
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistedAuthReducer = persistReducer(
  {
    key: "jwt-token",
    storage,
    whitelist: ["token"],
  },
  authReducer
);

export const store = configureStore({
  reducer: {
    contacts: tasksReducerCard,
    filters: filtersReducer,
    auth: persistedAuthReducer,
    language: languageReducer, // Додаємо в Redux in sliceLanguage-translate
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
