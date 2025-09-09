// LoginForm
import css from "./LoginForm.module.css";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function LoginForm() {
  const dispatch = useDispatch();
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  const notify = () => toast.success(t("successfully login !")); // Викликаємо toast із перекладеним текстом
  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        notify();
        // Очищаємо форму
        actions.resetForm();
      })
      .catch(err => {
        toast.error(err);
      });
  };
  return (
    <section className={css.item}>
      <Formik
        initialValues={{
          email: " ",
          password: " ",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={css.items}>
            <label className={css.label}>Email</label>
            <Field
              className={css.inp}
              type="email"
              name="email"
              placeholder="Enter login..."
            />
          </div>
          <div className={css.items}>
            <label className={css.label}>Password</label>
            <Field
              className={css.inp}
              type="password"
              name="password"
              placeholder="Enter password..."
            />
          </div>
          <div className={css.btn}>
            <button className={css.LoginForm} type="submit">
              {t("auth.btnLog")}
            </button>
          </div>
        </Form>
      </Formik>
    </section>
  );
}
