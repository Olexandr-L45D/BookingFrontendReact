import { useTranslation } from "react-i18next";
import LoginForm from "../../components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";
import { selectIsLoading } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

export default function LoginPage() {
  const { t, ready } = useTranslation();
  const isLoading = useSelector(selectIsLoading);
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <main>
      <section className={css.container}>
        <h1 className={css.cartTitle}>{t("login.titleLogin")}</h1>
        {isLoading ? <Loader /> : <LoginForm />}
      </section>
    </main>
  );
}
