import { useDispatch, useSelector } from "react-redux";
import { Navigation } from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import { AuthNav } from "../AuthNav/AuthNav";
import css from "./AppBar.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../redux/sliceLanguage";
import { fetchContact } from "../../redux/contacts/operations";

export const AppBar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { i18n } = useTranslation(); // Додано хук
  // Функція для зміни мови
  // const changeLanguage = language => {
  //   i18n.changeLanguage(language);
  // };
  const changeLanguage = language => {
    i18n.changeLanguage(language);
    dispatch(setLanguage(language)); // Міняємо Redux-стан мови
    dispatch(fetchContact()); // Перезапитуємо контакти вже на новій мові
  };
  return (
    <header className={css.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
      <div className={css.languageSwitcher}>
        <button onClick={() => changeLanguage("en")}>EN</button>
        <button onClick={() => changeLanguage("uk")}>UA</button>
      </div>
    </header>
  );
};

//  Додали переклад даних із бекенду при отриманні їх у Redux.
// Використали Google Translate API для автоматичного перекладу.
//  Додали Redux Slice для мови, щоб контролювати поточну мову.
//  Додали перезапит контактів при зміні мови.
//  Уникнули зайвих запитів — якщо мова en, переклад не виконується.

// Тепер ваш додаток працюватиме так:

// Спочатку контакти приходять англійською.
// При зміні мови в Redux оновлюється fetchContact.
// Контакти автоматично перекладаються перед збереженням у Redux.
// Всі компоненти отримують вже перекладені дані.
