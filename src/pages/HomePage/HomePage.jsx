import { useTranslation } from "react-i18next";
import css from "./HomePage.module.css";
import { FcBusinessman } from "react-icons/fc";

export default function HomePage() {
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <div className={css.container}>
      <div className={css.card}>
        <h1 className={css.cartTitle}>
          {t("auth.titleContactbook")}
          <FcBusinessman className={css.cartIcon} />
        </h1>
        <h1 className={css.cartText}>{t("contacts.titleWelcom")}</h1>
      </div>
    </div>
  );
}

//заголовок Contactbook
//Заголовок Welcom in my contact card
