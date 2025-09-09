import css from "./UpdateContactForm.module.css";
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { updateContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function UpdateContactForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 👈 хук для редіректу  navigate("/contacts"); // 👈 редірект на сторінку всіх контактів
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  const notify = () => toast.success("successfully updated !"); // Викликаємо toast із перекладеним текстом

  const handleSubmit = (values, actions) => {
    // Обрізаємо пробіли з усіх полів
    const payload = {
      contactId: values.contactId.trim() || "",
      phoneNumber: values.phoneNumber.trim() || "",
      email: values.email.trim() || "",
      role: values.role.trim() || "",
    };
    // Викликаємо thunk
    dispatch(updateContact(payload))
      .unwrap()
      .then(() => {
        notify();
        // Очищаємо форму
        actions.resetForm();
        navigate("/contacts");
      })
      .catch(err => {
        toast.error(err);
      });
  };

  return (
    <section className={css.item}>
      <Formik
        initialValues={{
          contactId: "",
          phoneNumber: "",
          email: "",
          role: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={css.items}>
            <label className={css.label}>{"Contact Id"}</label>
            <Field
              className={css.inp}
              type="text"
              name="contactId"
              placeholder={"Enter Contact Id..."}
            />
            <ErrorMessage
              className={css.messag}
              name="contactId"
              component="span"
            />
          </div>
          <div className={css.items}>
            <label className={css.label}>{t("contacts.number")}</label>
            <Field
              className={css.inp}
              type="text"
              name="phoneNumber"
              placeholder={t("contacts.numberPlaceholder")}
            />
            <ErrorMessage
              className={css.messag}
              name="phoneNumber"
              component="span"
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
            <ErrorMessage
              className={css.messag}
              name="email"
              component="span"
            />
          </div>

          <div className={css.items}>
            <label className={css.label}>Role</label>
            <Field
              className={css.inp}
              type="text"
              name="role"
              placeholder="Enter role..."
            />
            <ErrorMessage className={css.messag} name="role" component="span" />
          </div>

          <div className={css.btn}>
            <button onClick={notify} className={css.addContact} type="submit">
              {t("contacts.updatedButton")}
            </button>
            <Toaster />
          </div>
        </Form>
      </Formik>
    </section>
  );
}

// {
//   "name": "Dima Prod",
//   "phoneNumber": "222-33-115",
//   "email": "Dima_Doe123@gmail.com",
//   "role": "business"
// }
