import css from "./RegistrationForm.module.css";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  const notify = () => toast.success(t("successfully register !"));

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(register(values))
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
    <div className={css.item}>
      <Formik
        initialValues={{
          name: " ",
          email: " ",
          password: " ",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={css.items}>
            <label className={css.label}>Name</label>
            <Field
              className={css.inp}
              type="name"
              name="name"
              placeholder="Enter name..."
            />
          </div>

          <div className={css.items}>
            <label className={css.label}>Email</label>
            <Field
              className={css.inp}
              type="email"
              name="email"
              placeholder="Enter email..."
            />
          </div>

          <div className={css.items}>
            <label className={css.label}>Password</label>
            <Field
              className={css.inp}
              type="password"
              name="password"
              placeholder="Please enter numbers and uppercase letters..."
            />
          </div>

          <div className={css.btn}>
            <button className={css.regForm} type="submit">
              {t("contacts.create")}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
