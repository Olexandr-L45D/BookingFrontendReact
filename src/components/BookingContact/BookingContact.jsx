// BookingContact
import css from "./BookingContact.module.css";
import { FcAlarmClock } from "react-icons/fc";
import { FcVip } from "react-icons/fc";
import { FcCalendar } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { deleteBooking } from "../../redux/booking/operations";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function BookingContact({ contact }) {
  const dispatch = useDispatch();
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  const notify = () => toast.success("reservation deleted"); // Викликаємо тост із перекладеним текстом

  const handleDelete = () => {
    dispatch(deleteBooking(contact._id)); // Видаляємо контакт
    notify(); // Показуємо повідомлення
  };

  return (
    <section className={css.item}>
      <section className={css.itemBlock}>
        <ul className={css.itemText}>
          <li className={css.text}>
            <FcCalendar className={css.iconReact} />
            Booking Id: {contact._id}
          </li>
          <li className={css.text}>Client Id: {contact.clientId}</li>
          <li className={css.text}>
            <FcVip className={css.iconReact} />
            Business Id: {contact.businessId}
          </li>
          <li className={css.text}>Date: {contact.date}</li>
          <li className={css.text}>
            <FcAlarmClock className={css.iconReact} />
            Time: {contact.time}
          </li>
          <li className={css.text}>Status: {contact.status}</li>
        </ul>
        <button className={css.btn} onClick={handleDelete}>
          {t("contacts.delete")}
        </button>
      </section>
      <Toaster />
    </section>
  );
}

// [
//   {
//     id: "64adf1c2a1b23cd456ef890a",
//     clientId: "64adf1c2a1b23cd456ef1111",
//     businessId: "64adf1c2a1b23cd456ef2222",
//     date: "2025-09-10",
//     time: "14:00",
//     status: "pending",
//   },
// ];
