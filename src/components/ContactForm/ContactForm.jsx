import css from "./ContactForm.module.css";
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const dispatch = useDispatch();
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  const notify = () => toast.success(t("contacts.addedNotification")); // Викликаємо тост із перекладеним текстом

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };
  return (
    <div className={css.item}>
      <Formik
        initialValues={{
          name: " ",
          number: " ",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={css.items}>
            <label className={css.label}>{t("contacts.name")}</label>
            <Field
              className={css.inp}
              type="text"
              name="name"
              placeholder={t("contacts.namePlaceholder")}
            />
            <ErrorMessage className={css.messag} name="name" component="span" />
          </div>
          <div className={css.items}>
            <label className={css.label}>{t("contacts.number")}</label>
            <Field
              className={css.inp}
              type="text"
              name="number"
              placeholder={t("contacts.numberPlaceholder")}
            />
            <ErrorMessage
              className={css.messag}
              name="number"
              component="span"
            />
          </div>
          <div className={css.btn}>
            <button onClick={notify} className={css.addContact} type="submit">
              {t("contacts.added")}
            </button>
            <Toaster />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
