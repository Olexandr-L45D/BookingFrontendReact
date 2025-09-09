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
      <section className={css.container}>
        <h1 className={css.cartForm}>{t("contacts.titleUpdateContact")}</h1>
        <UpdateContactForm />
      </section>
    </main>
  );
}
