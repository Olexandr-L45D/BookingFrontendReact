import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const newLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { t, ready } = useTranslation();

  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <div className={css.container}>
      <nav className={css.nav}>
        <NavLink to="/" className={newLinkClass}>
          {t("navigation.home")}
        </NavLink>

        {isLoggedIn && (
          <NavLink to="/contacts" className={newLinkClass}>
            {t("navigation.contacts")}
          </NavLink>
        )}
      </nav>
    </div>
  );
};

// замінив текст на посилання до файлу з перекладом  {/* Home */} та {/* Contacts */}
// Aleksandr
// Aleksandr @gmail.com.ua
// Alek12345

// Navigation (тепер він в AppBar і розділив його на 2 компоненти UsMenu and AutNav які далі здійснюють навігацію по сайту між сторінками (сторінки в pages))

//  <NavLink to="/register" className={newLinkClass}>
//                 Register
//             </NavLink>
//             <NavLink to="/login" className={newLinkClass}>
//                 Log In
//             </NavLink>
