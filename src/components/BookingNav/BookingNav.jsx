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
    <div className={css.blokLink}>
      <NavLink className={newLinkClass} to="/booking">
        {/* {t("navigation.register")} */}
        create a reservation
      </NavLink>
      <NavLink className={newLinkClass} to="/booking/me">
        {/* {t("navigation.login")} */}
        my reservations
      </NavLink>

      {/* <NavLink className={newLinkClass} to="/:id">
        dellete reservation
      </NavLink>
      <NavLink className={newLinkClass} to="/:id/cancel">
        cancel reservation
      </NavLink> */}

      <NavLink className={newLinkClass} to="/:id/update">
        {/* {t("navigation.login")} */}
        update reservation
      </NavLink>
    </div>
  );
};

// routs in bekend

// const bookingsRouter = Router();

// bookingsRouter.use(authenticate);
// bookingsRouter.post("/", createBooking);

// // Отримати всі свої бронювання
// bookingsRouter.get("/me", getMyBookings);

// // Видалити бронювання
// bookingsRouter.delete("/:id", deleteBooking);

// // Відмінити бронювання
// bookingsRouter.patch("/:id/cancel", cancelBooking);
// // Змінити данні по бронюванню
// bookingsRouter.patch("/:id/update", updateBooking);

// export default bookingsRouter;
