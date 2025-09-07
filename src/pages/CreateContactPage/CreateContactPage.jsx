import css from "./CreateContactPage.module.css";
import ContactForm from "../../components/ContactForm/ContactForm";
import { useTranslation } from "react-i18next";

export default function CreateContactPage() {
  const { t } = useTranslation();

  return (
    <div className={css.container}>
      <h1 className={css.cartTitle}>{t("contacts.titleContact")}</h1>
      <ContactForm />
    </div>
  );
}
