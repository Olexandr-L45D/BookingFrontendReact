import { useTranslation } from "react-i18next";

import css from "./BookingPage.module.css";
import BookingForm from "../../components/BookingForm/BookingForm";

export default function BookingPage() {
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <main>
      <section className={css.container}>
        <h1 className={css.cartForm}>{t("register.titleSchedule")}</h1>
        <BookingForm />
      </section>
    </main>
  );
}
