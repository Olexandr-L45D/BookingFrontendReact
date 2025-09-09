// UpdateContactForm
import { useTranslation } from "react-i18next";
import css from "./UpdateContactPage.module.css";
import UpdateContactForm from "../../components/UpdateContactForm/UpdateContactForm";

export default function UpdateContactPage() {
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <main>
      <div className={css.container}>
        <h3 className={css.cartForm}>{t("contacts.titleUpdateContact")}</h3>
        <UpdateContactForm />
      </div>
    </main>
  );
}
