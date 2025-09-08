import { useTranslation } from "react-i18next";

import css from "./UpdateBookingPage.module.css";
import UpdateBookingForm from "../../components/UpdateBookingForm/UpdateBookingForm";

export default function UpdateBookingPage() {
  const { ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <main>
      <div className={css.container}>
        <h3 className={css.cartForm}>
          {/* {t("register.titleRegistr")} */}
          Update reservation
        </h3>
        <UpdateBookingForm />
      </div>
    </main>
  );
}
