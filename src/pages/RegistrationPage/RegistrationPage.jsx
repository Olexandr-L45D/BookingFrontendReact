import { useTranslation } from "react-i18next";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import css from "./RegistrationPage.module.css";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/auth/selectors";

export default function RegistrationPage() {
  const { t, ready } = useTranslation();
  const isLoading = useSelector(selectIsLoading);
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  return (
    <main>
      <section className={css.container}>
        <h1 className={css.cartForm}>{t("register.titleRegistr")}</h1>
        {isLoading ? <Loader /> : <RegistrationForm />}
      </section>
    </main>
  );
}

//Example Role =  ['client', 'business'];
