import css from "./ContactsPage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactList from "../../components/ContactList/ContactList";
import { fetchContact } from "../../redux/contacts/operations";
import { selectLoading } from "../../redux/contacts/selectors";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useTranslation } from "react-i18next";
import { selectToken } from "../../redux/auth/selectors";
import Loader from "../../components/Loader/Loader";

export default function ContactsPage() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);
  const { t } = useTranslation();

  const token = useSelector(selectToken) || localStorage.getItem("token");

  useEffect(() => {
    if (!token) return; // чекати токен
    dispatch(fetchContact());
  }, [dispatch, token]);

  return (
    <section className={css.container}>
      <h1 className={css.cartTitle}>{t("contacts.titleCard")}</h1>
      <SearchBox />
      {isLoading ? <Loader /> : <ContactList />}
    </section>
  );
}

// Тут треба додати ЛОАДЕР поки чекаю відповідь з сервера!!!)

// Your Contact Card   (треба додати ЛОАДЕР поки чекаю відповідь з сервера!!!)
// {/* <ContactForm />
// { loading && <Loader>Loading message</Loader> }
// { error && <Error>Error message</Error> }
//       <SearchBox />
//       <ContactList /> */}
