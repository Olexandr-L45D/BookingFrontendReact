import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./i18n"; // Імпорт налаштувань i18next
import "modern-normalize";
import "./index.css";
// import { createRoot } from "react-dom/client";
import App from "./components/App/App";
// 1. Імпортуємо провайдер
import { Provider } from "react-redux";
// 2. Імпортуємо створений раніше стор, який зберігається в файлі redux/filters/store
// import { store, persistor } from "../src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../src/redux/store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading translations...</div>}>
            <App />
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
