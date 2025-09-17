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

  const notify = () => toast.success("Create booking successfully!");

  const handleSubmit = (values, actions) => {
    const payload = {
      businessId: values.businessId.trim(),
      date: new Date(values.date).toISOString(), // format date: '2025-09-18T00:00:00.000Z'
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
      return;
    }

    dispatch(addReserve(payload))
      .unwrap()
      .then(() => {
        notify();
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
                      field.onChange(e);
                      handleTimeChange(e, setFieldValue, values.date);
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
              <Field className={css.inp} type="time" name="endTime" disabled />
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
