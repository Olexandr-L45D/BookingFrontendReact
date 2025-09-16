import css from "./BookingForm.module.css";
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addReserve } from "../../redux/booking/operations";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function BookingForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookings = useSelector(state => state.booking.items || []);
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }

  const notify = () => toast.success(t("contacts.addedNotification")); // Викликаємо toast із перекладеним текстом

  const handleSubmit = (values, actions) => {
    const payload = {
      businessId: values.businessId.trim(),
      date: new Date(values.date).toISOString(), //to format: '2025-09-18T00:00:00.000Z'
      time: new Date(`${values.date}T${values.time}`).toISOString(),
      endTime: new Date(`${values.date}T${values.endTime}`).toISOString(),
    };

    // перевірка на конфлікт
    const isTaken = bookings.some(
      b =>
        b.businessId === payload.businessId &&
        new Date(b.time).getTime() === new Date(payload.time).getTime() &&
        b.status !== "cancelled"
    );

    if (isTaken) {
      toast.error("Цей час вже зайнятий! Оберіть +30 хвилин або інший день.");
      return; // не відправляємо dispatch
    }
    console.log("Payload:", payload);
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

  const handleTimeChange = (e, setFieldValue) => {
    const startTime = e.target.value; // "HH:mm"
    setFieldValue("time", startTime);

    // обчислюємо endTime у форматі HH:mm
    if (startTime) {
      const [h, m] = startTime.split(":").map(Number);
      const end = new Date();
      end.setHours(h, m + 30);
      const hh = String(end.getHours()).padStart(2, "0");
      const mm = String(end.getMinutes()).padStart(2, "0");
      setFieldValue("endTime", `${hh}:${mm}`);
    }
  };

  return (
    <section className={css.item}>
      <Formik
        initialValues={{
          businessId: "",
          date: "",
          time: "",
          endTime: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
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
                type="date"
                name="date"
                placeholder="Enter date format: ..."
              />
              <ErrorMessage
                className={css.messag}
                name="date"
                component="span"
              />
            </div>

            <div className={css.items}>
              <label className={css.label}>Time</label>
              <Field name="time">
                {({ field }) => (
                  <input
                    {...field}
                    className={css.inp}
                    type="time"
                    name="time"
                    placeholder="Enter time..."
                    onChange={e => {
                      field.onChange(e); // оновлює Formik
                      handleTimeChange(e, setFieldValue, values.date); // твоя логіка з endTime
                    }}
                  />
                )}
              </Field>

              <ErrorMessage
                className={css.messag}
                name="time"
                component="span"
              />
            </div>
            <div className={css.items}>
              <label className={css.label}>End Time</label>
              <Field
                className={css.inp}
                type="time"
                name="endTime"
                disabled // 👈 тільки для перегляду
              />
            </div>

            <div className={css.btn}>
              <button onClick={notify} className={css.addContact} type="submit">
                {t("contacts.bookong")}
              </button>
              <Toaster />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}

// отримав в консолі при відправці з фронтенда
// businessId: "68bf811b9e2e49c100c974d9";
// date: "2025-09-21T00:00:00.000Z";
// endTime: "2025-09-21T13:50:00.000Z";
// time: "2025-09-21T13:20:00.000Z";

// отримав в свагері при вдалому тесту
// {
//   "businessId": "68bf811b9e2e49c100c974d9",
//   "date": "2025-09-18T00:00:00.000Z",
//   "time": "2025-09-18T14:00:00.000Z",
//   "endTime": "2025-09-18T14:30:00.000Z"
// }

// const payload = {
//   businessId,
//   clientId,
//   date: startDateTime,
//   endTime: endDateTime,
// };

// відповідь з новим форматом дат при створенні нового бронювання
// {
//   "status": 201,
//   "message": "Booking successfully created",
//   "data": {
//     "clientId": "68bf805f9e2e49c100c974ca",
//     "businessId": "68bf81d49e2e49c100c974e1",
//     "date": "2025-09-18T00:00:00.000Z",
//     "time": "2025-09-18T14:00:00.000Z",
//     "endTime": "2025-09-18T14:30:00.000Z",
//     "status": "pending",
//     "_id": "68c92abd742c3fce2a68f7a5",
//     "createdAt": "2025-09-16T09:15:41.982Z",
//     "updatedAt": "2025-09-16T09:15:41.982Z",
//     "__v": 0
//   }
// }

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
