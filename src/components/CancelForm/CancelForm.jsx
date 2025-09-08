//Component CancelForm
import css from "./CancelForm.module.css";
import { Formik, Form, Field } from "formik";
import { ErrorMessage } from "formik";
import { cancelBooking } from "../../redux/booking/operations";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

export default function CancelForm() {
  const dispatch = useDispatch();
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  const notify = () => toast.success("reservation cancelled"); // Викликаємо toast із перекладеним текстом

  const handleSubmit = (values, actions) => {
    // Обрізаємо пробіли з усіх полів
    const payload = {
      id: values.id.trim(),
      status: values.status.trim(),
    };
    // Викликаємо thunk
    dispatch(cancelBooking(payload));
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
          status: " ",
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
            <label className={css.label}>Status</label>
            <Field
              className={css.inp}
              type="text"
              name="status"
              placeholder="Enter the cancelled..."
            />
            <ErrorMessage
              className={css.messag}
              name="status"
              component="span"
            />
          </div>

          <div className={css.btn}>
            <button
              onClick={notify}
              className={css.cancelledButton}
              type="submit"
            >
              {t("contacts.bookong")}
            </button>
            <Toaster />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

// "status": "pending", "cancelled"
