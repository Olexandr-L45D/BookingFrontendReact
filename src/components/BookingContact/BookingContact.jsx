// BookingContact це картка бронювання з початковими данними
import css from "./BookingContact.module.css";
import { FcAlarmClock } from "react-icons/fc";
import { FcVip } from "react-icons/fc";
import { FcCalendar } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { deleteBooking } from "../../redux/booking/operations";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function BookingContact({ contact }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 👈 хук для редіректу на форму редагування цього бронювання
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  const notify = () => toast.success("reservation deleted"); // Викликаємо тост із перекладеним текстом

  const handleDelete = () => {
    dispatch(deleteBooking(contact._id)); // Видаляємо бронювання
    notify(); // Показуємо повідомлення
  };

  const handleUpdate = () => {
    navigate(`/${contact._id}/update`);
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
          <li className={css.text}>End Time: {contact.endTime}</li>
          <li className={css.text}>Status: {contact.status}</li>
        </ul>
        <div className={css.btnBlock}>
          <button className={css.btn} onClick={handleUpdate}>
            Update
          </button>
          <button className={css.btnDell} onClick={handleDelete}>
            {t("contacts.delete")}
          </button>
        </div>
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
