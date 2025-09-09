import css from "./BookingForm.module.css";
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addReserve } from "../../redux/booking/operations";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// import { selectAllReservationsBooking } from "../../redux/booking/selectors";

export default function BookingForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 👈 хук для редіректу
  const bookings = useSelector(state => state.booking.items || []);
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }

  const notify = () => toast.success(t("contacts.addedNotification")); // Викликаємо toast із перекладеним текстом

  const handleSubmit = (values, actions) => {
    const payload = {
      businessId: values.businessId.trim(),
      date: values.date.trim(),
      time: values.time.trim(),
    };

    // перевірка на конфлікт
    const isTaken = bookings.some(
      b =>
        b.businessId === payload.businessId &&
        b.date === payload.date &&
        b.time === payload.time &&
        b.status !== "cancelled"
    );

    if (isTaken) {
      toast.error("Цей час вже зайнятий! Оберіть +30 хвилин або інший день.");
      return; // не відправляємо dispatch
    }

    // Викликаємо thunk
    dispatch(addReserve(payload))
      .unwrap()
      .then(() => {
        notify();
        // Очищаємо форму
        actions.resetForm();
        navigate("/booking/me");
      })
      .catch(err => {
        toast.error(err);
      });
  };

  return (
    <section className={css.item}>
      <Formik
        initialValues={{
          businessId: "",
          date: "",
          time: "",
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
    </section>
  );
}

// updateBooking - services
// // те що вношу в форму бронювання  =
// {
//   "businessId": "68bc6b9f2f071eae4ff81caa",
//   "date": "2025-09-07",
//   "time": "11:00"
// }

// // відповідь при вдалому бронюванню =

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
