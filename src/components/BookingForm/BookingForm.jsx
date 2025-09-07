import css from "./BookingForm.module.css";
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function BookingForm() {
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
          businessId: " ",
          date: " ",
          time: " ",
          role: " ",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={css.items}>
            <label className={css.label}>BusinessId</label>
            <Field
              className={css.inp}
              type="text"
              name="businessId"
              placeholder="Enter businessId..."
            />
            <ErrorMessage
              className={css.messag}
              name="businessId"
              component="span"
            />
          </div>
          <div className={css.items}>
            <label className={css.label}>Date</label>
            <Field
              className={css.inp}
              type="text"
              name="date"
              placeholder="Enter date format: 2025-09-07..."
            />
            <ErrorMessage className={css.messag} name="date" component="span" />
          </div>

          <div className={css.items}>
            <label className={css.label}>Time</label>
            <Field
              className={css.inp}
              type="text"
              name="time"
              placeholder="Enter time..."
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
//   "businessId": "68bc6b9f2f071eae4ff81caa",
//   "date": "2025-09-07",
//   "time": "11:00"
// }

// відповідь =

// {
//   "status": 201,
//   "message": "Booking successfully created",
//   "data": {
//     "clientId": "68bc381901e47c5f0665b865",
//     "businessId": "68bc6b9f2f071eae4ff81caa",
//     "date": "2025-09-07",
//     "time": "11:00",
//     "status": "pending",
//     "_id": "68bc6c452f071eae4ff81cae",
//     "createdAt": "2025-09-06T17:15:49.900Z",
//     "updatedAt": "2025-09-06T17:15:49.900Z",
//     "__v": 0
//   }
// }
