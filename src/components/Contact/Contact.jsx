import css from "./Contact.module.css";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const { t, ready } = useTranslation();
  if (!ready) {
    return <div>Loading translations...</div>;
  }
  const notify = () => toast.success(t("contacts.deleteNotification")); // Викликаємо тост із перекладеним текстом

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

// Delete міняю на динамічне значення для перекладу
// const MyComponent = () => {
//     // 2. Отримуємо посилання на функцію відправки екшенів
//     const dispatch = useDispatch();
//     // 3. Функція селектор стану (належить слайсу тому що отримує частинку слайсу)
//     const items = useSelector(deleteContact);
// };

// export default function Contact({ obj: { id, name, number }, onDelete }) - old Exemple!
