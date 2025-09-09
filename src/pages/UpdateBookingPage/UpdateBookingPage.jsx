import { useTranslation } from "react-i18next";

import css from "./UpdateBookingPage.module.css";
import UpdateBookingForm from "../../components/UpdateBookingForm/UpdateBookingForm";

export default function UpdateBookingPage() {
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <main>
      <section className={css.container}>
        <h1 className={css.cartForm}>{t("register.buttonUpdateBooking")}</h1>
        <UpdateBookingForm />
      </section>
    </main>
  );
}
