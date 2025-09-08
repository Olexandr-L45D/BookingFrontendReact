import css from "./UpdateBookingForm.module.css";
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";
import { updateBooking } from "../../redux/booking/operations";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

export default function UpdateBookingForm() {
  const dispatch = useDispatch();
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  const notify = () => toast.success(t("contacts.addedNotification")); // Викликаємо toast із перекладеним текстом

  const handleSubmit = (values, actions) => {
    // Обрізаємо пробіли з усіх полів
    const payload = {
      id: values.id.trim(),
      date: values.date.trim(),
      time: values.time.trim(),
    };
    // Викликаємо thunk
    dispatch(updateBooking(payload));
    // Очищаємо форму
    actions.resetForm();
    // Показуємо повідомлення (toast)
    notify();
  };
  return (
    <div className={css.item}>
      <Formik
        initialValues={{
          id: " ",
          date: " ",
          time: " ",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={css.items}>
            <label className={css.label}>Booking Id</label>
            <Field
              className={css.inp}
              type="id"
              name="id"
              placeholder="Enter booking id..."
            />
            <ErrorMessage className={css.messag} name="id" component="span" />
          </div>
          <div className={css.items}>
            <label className={css.label}>Date</label>
            <Field
              className={css.inp}
              type="date"
              name="date"
              placeholder="Enter date format: 2025-09-07..."
            />
            <ErrorMessage className={css.messag} name="date" component="span" />
          </div>

          <div className={css.items}>
            <label className={css.label}>Time</label>
            <Field
              className={css.inp}
              type="time"
              name="time"
              placeholder="Enter time..."
            />
            <ErrorMessage className={css.messag} name="time" component="span" />
          </div>

          <div className={css.btn}>
            <button onClick={notify} className={css.addContact} type="submit">
              {t("contacts.bookong")}
            </button>
            <Toaster />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

// updateBooking - services

// "requestBody": {
//           "required": true,
//           "content": {
//             "application/json": {
//               "schema": {
//                 "type": "object",
//                 "properties": {
//                   "time": {
//                     "type": "string",
//                     "format": "date-time",
//                     "example": "2025-09-10T14:00:00Z"
//                   },
//                   "contact": {
//                     "type": "string",
//                     "example": "John Doe"
//                   },
//                   "phoneNumber": {
//                     "type": "string",
//                     "example": "+380501234567"
//                   },
//                   "tableNumber": {
//                     "type": "integer",
//                     "example": 12
//                   }
//                 }
