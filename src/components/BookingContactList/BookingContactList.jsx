// BookingContactList
import css from "./BookingContactList.module.css";
import { selectAllReservationsBooking } from "../../redux/booking/selectors";
import { useSelector } from "react-redux";
import BookingContact from "../BookingContact/BookingContact";

export default function BookingContactList() {
  const items = useSelector(selectAllReservationsBooking);

  return (
    <section className={css.container}>
      <ul className={css.list}>
        {items.map(contact => (
          <li className={css.item} key={contact.id}>
            <BookingContact contact={contact} />
          </li>
        ))}
      </ul>
    </section>
  );
}
