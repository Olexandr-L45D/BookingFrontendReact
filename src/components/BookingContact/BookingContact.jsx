// BookingContact
import css from "./BookingContact.module.css";
import { BsFillPersonFill } from "react-icons/bs";
import { FcAlarmClock } from "react-icons/fc";
import { FcVip } from "react-icons/fc";
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
    dispatch(deleteBooking(contact.id)); // Видаляємо контакт
    notify(); // Показуємо повідомлення
  };

  return (
    <section className={css.item}>
      <ul className={css.itemText}>
        <li className={css.text}>
          <BsFillPersonFill />
          {t("contacts.labelName")}: {contact.id}
        </li>
        <li className={css.text}>Client Id: {contact.clientId}</li>
        <li className={css.text}>
          <FcVip />
          Business Id: {contact.businessId}
        </li>
        <li className={css.text}>Date: {contact.date}</li>
        <li className={css.text}>
          <FcAlarmClock />
          Time: {contact.time}
        </li>
        <li className={css.text}>Status: {contact.status}</li>
      </ul>
      <button className={css.btn} onClick={handleDelete}>
        {t("contacts.delete")}
      </button>
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
