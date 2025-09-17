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
    <section className={css.container}>
      <nav className={css.nav}>
        <NavLink to="/" className={newLinkClass}>
          {t("navigation.home")}
        </NavLink>

        {isLoggedIn && (
          <NavLink to="/contacts" className={newLinkClass}>
            {t("navigation.contacts")}
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink to="/createContact" className={newLinkClass}>
            {t("navigation.createContact")}
          </NavLink>
        )}
      </nav>
    </section>
  );
};
