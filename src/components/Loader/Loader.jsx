import { useState, useEffect } from "react";
import css from "./Loader.module.css";
import { useTranslation } from "react-i18next";

export default function Loader({ children }) {
  const [dots, setDots] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(
        dots => (dots.length < 3 ? t("loader.shortTextMessage") : "") // Використовуємо переклад
      );
    }, 250);

    return () => clearInterval(interval);
  }, [t]); // Додаємо `t` до залежностей useEffect

  return (
    <p className={css.text}>
      <b>
        {children}
        {dots}
      </b>
    </p>
  );
}
