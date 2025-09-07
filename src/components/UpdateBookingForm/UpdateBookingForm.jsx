import css from "./UpdateBookingForm.module.css";
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
//   "time": "2025-09-10T14:00:00Z",
//   "contact": "John Doe",
//   "phoneNumber": "+380501234567",
//   "tableNumber": 12
// }

// {
//   "status": 200,
//   "message": "Booking updated successfully",
//   "data": {
//     "id": "64adf1c2a1b23cd456ef890a",
//     "clientId": "64adf1c2a1b23cd456ef1111",
//     "businessId": "64adf1c2a1b23cd456ef2222",
//     "date": "2025-09-10",
//     "time": "14:00",
//     "status": "pending"
//   }
// }
