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
  const notify = () => toast.success(t("Reservation successfully updated !")); // Викликаємо toast із перекладеним текстом

  const handleSubmit = (values, actions) => {
    // Обрізаємо пробіли з усіх полів
    const payload = {
      id: values.id.trim() || "",
      date: values.date.trim() || "",
      time: values.time.trim() || "",
      status: values.status.trim() || "",
    };
    // Викликаємо thunk
    dispatch(updateBooking(payload))
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
          id: "",
          date: "",
          time: "",
          status: "",
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
              type="time"
              name="time"
              placeholder="Choose a time..."
            />
            <ErrorMessage className={css.messag} name="time" component="span" />
          </div>
          <div className={css.items}>
            <label className={css.label}>Status</label>
            <Field
              className={css.inp}
              type="text"
              name="status"
              placeholder="Example: confirmed or cancelled ..."
            />
            <ErrorMessage className={css.messag} name="date" component="span" />
          </div>

          <div className={css.btn}>
            <button onClick={notify} className={css.addContact} type="submit">
              {t("contacts.bookongUpdate")}
            </button>
            <Toaster />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

// Example Request server
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
