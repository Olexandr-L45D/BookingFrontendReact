import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // Використовуємо бекенд для завантаження перекладів
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Мова за замовчуванням
    debug: true,
    interpolation: {
      escapeValue: false, // React автоматично екранує значення
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Шлях до файлів перекладу
    },
  });

export default i18n;
