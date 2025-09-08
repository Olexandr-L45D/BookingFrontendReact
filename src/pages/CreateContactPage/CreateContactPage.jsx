import css from "./CreateContactPage.module.css";
import ContactForm from "../../components/ContactForm/ContactForm";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import { selectLoading } from "../../redux/contacts/selectors";

export default function CreateContactPage() {
  const { t } = useTranslation();
  const isLoading = useSelector(selectLoading);

  return (
    <div className={css.container}>
      <h1 className={css.cartTitle}>{t("contacts.titleContact")}</h1>
      {isLoading ? <Loader /> : <ContactForm />}
    </div>
  );
}
