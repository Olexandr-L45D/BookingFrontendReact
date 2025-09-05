import css from "./ContactsPage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import { fetchContact } from "../../redux/contacts/operations";
import { selectLoading } from "../../redux/contacts/selectors";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useTranslation } from "react-i18next";

export default function ContactsPage() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return (
    <div className={css.cartPage}>
      <h1 className={css.cartTitle}>{t("contacts.titleCard")}</h1>
      <ContactForm />
      <div>{isLoading && "Request in progress..."}</div>
      <SearchBox />
      <ContactList />
    </div>
  );
}

// Your Contact Card
// {/* <ContactForm />
// { loading && <Loader>Loading message</Loader> }
// { error && <Error>Error message</Error> }
//       <SearchBox />
//       <ContactList /> */}
