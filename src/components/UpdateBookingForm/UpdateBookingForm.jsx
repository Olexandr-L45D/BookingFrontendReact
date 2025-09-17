import css from "./UpdateBookingForm.module.css";
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";
import { updateBooking } from "../../redux/booking/operations";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateBookingForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  const notify = () => toast.success("Reservation successfully updated !");

  const handleSubmit = (values, actions) => {
    const payload = {
      id,
      date: new Date(values.date).toISOString(), // format date: '2025-09-18T00:00:00.000Z'
      time: new Date(`${values.date}T${values.time}`).toISOString(),
      endTime: new Date(`${values.date}T${values.endTime}`).toISOString(),
      status: values.status.trim() || "",
    };
    dispatch(updateBooking(payload))
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
          date: "",
          time: "",
          endTime: "",
          status: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className={css.items}>
              <label className={css.label}>Date</label>
              <Field
                className={css.inp}
                type="date"
                name="date"
                placeholder="Enter date format..."
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
            <div className={css.items}>
              <label className={css.label}>Status</label>
              <Field className={css.select} as="select" name="status">
                <option value="" disabled>
                  -- Select status --
                </option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </Field>
              <ErrorMessage
                className={css.messag}
                name="status"
                component="span"
              />
            </div>

            <div className={css.btn}>
              <button onClick={notify} className={css.addContact} type="submit">
                {t("contacts.bookongUpdate")}
              </button>
              <Toaster />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
