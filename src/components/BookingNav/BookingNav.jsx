import { NavLink } from "react-router-dom";
import css from "./BookingNav.module.css";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const newLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const BookingNav = () => {
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...{t("navigation.register")}</div>;
  }
  return (
    <section className={css.blokLink}>
      <NavLink className={newLinkClass} to="/booking">
        {t("navigation.reservation")}
      </NavLink>
      <NavLink className={newLinkClass} to="/booking/me">
        {t("navigation.myReservations")}
      </NavLink>

      <NavLink className={newLinkClass} to="/:id/update">
        {t("navigation.updateReservation")}
      </NavLink>
    </section>
  );
};
