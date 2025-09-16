// UserMenu
import css from "./UserMenu.module.css";
import { useDispatch } from "react-redux";
// import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";

export default function UserMenu() {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <section className={css.wrapper}>
      <button
        className={css.button}
        onClick={() => dispatch(logOut())}
        type="button"
      >
        {t("auth.logout")}
      </button>
    </section>
  );
}
// якщо хочу відобразити імя авторизованого юзера
//  <p className={css.username}>
//    {t("auth.welcome")}, {user.name}
//  </p>;
