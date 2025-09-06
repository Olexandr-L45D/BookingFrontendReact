// BookingContact
import css from "./BookingContact.module.css";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
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
    dispatch(deleteContact(contact.id)); // Видаляємо контакт
    notify(); // Показуємо повідомлення
  };

  return (
    <div className={css.item}>
      <div className={css.itemText}>
        <p className={css.text}>
          <BsFillPersonFill />
          {t("contacts.labelName")}: {contact.name}
        </p>
        <p className={css.text}>
          <AiFillPhone />
          {t("contacts.labelPhone")}: {contact.number}
        </p>
      </div>
      <button className={css.btn} onClick={handleDelete}>
        {t("contacts.delete")}
      </button>
      <Toaster />
    </div>
  );
}
