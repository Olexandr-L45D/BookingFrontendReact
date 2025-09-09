import { useTranslation } from "react-i18next";
import css from "./HomePage.module.css";
import { FcBusinessman } from "react-icons/fc";

export default function HomePage() {
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <main className={css.container}>
      <section className={css.card}>
        <h1 className={css.cartTitle}>
          {t("auth.titleContactbook")}
          <FcBusinessman className={css.cartIcon} />
        </h1>
        <h2 className={css.cartText}>{t("contacts.titleWelcom")}</h2>
      </section>
    </main>
  );
}

//заголовок Contactbook
//Заголовок Welcom in my contact card
