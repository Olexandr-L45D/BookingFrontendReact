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
  const notify = () => toast.success(t("contacts.addedNotification")); // Викликаємо toast із перекладеним текстом

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };
  return (
    <div className={css.item}>
      <Formik
        initialValues={{
          name: " ",
          phoneNumber: " ",
          email: " ",
          role: " ",
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
              type="name"
              name="role"
              placeholder="Enter role..."
            />
            <ErrorMessage className={css.messag} name="role" component="span" />
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

// {
//   "name": "Dima Prod",
//   "phoneNumber": "222-33-115",
//   "email": "Dima_Doe123@gmail.com",
//   "role": "business"
// }
// // відповідь при створенні контакта
// {
//   "status": 201,
//   "message": "Successfully created a contact!",
//   "contact": {
//     "name": "Dima Prod",
//     "phoneNumber": "222-33-115",
//     "email": "Dima_Doe123@gmail.com",
//     "role": "business",
//     "userId": "68bc381901e47c5f0665b865",
//     "_id": "68bc6b9f2f071eae4ff81caa",
//     "createdAt": "2025-09-06T17:13:03.377Z",
//     "updatedAt": "2025-09-06T17:13:03.377Z"
//   }
// }
