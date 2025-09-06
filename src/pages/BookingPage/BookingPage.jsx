import { useTranslation } from "react-i18next";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import css from "./BookingPage.module.css";

export default function BookingPage() {
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <main>
      <div className={css.container}>
        <h3 className={css.cartForm}>{t("register.titleRegistr")}</h3>
        <RegistrationForm />
      </div>
    </main>
  );
}

// RegistrationForm BookingPage
