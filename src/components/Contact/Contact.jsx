import css from "./Contact.module.css";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { FcAddressBook } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";
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
    dispatch(deleteContact(contact._id)); // Видаляємо контакт
    notify(); // Показуємо повідомлення
  };

  return (
    <section className={css.item}>
      <ul className={css.itemText}>
        <li className={css.text}>
          <BsFillPersonFill className={css.iconReact} />
          {t("contacts.labelName")}: {contact.name}
        </li>
        <li className={css.text}>
          <AiFillPhone className={css.iconReact} />
          {t("contacts.labelPhone")}: {contact.phoneNumber}
        </li>
        <li className={css.text}>
          <FcAddressBook className={css.iconReact} />
          Email: {contact.email}
        </li>
        <li className={css.text}>
          <AiOutlineHome className={css.iconReact} />
          Role: {contact.role}
        </li>
        <li className={css.text}>
          <FcAbout className={css.iconReact} />
          Id: {contact._id}
        </li>
      </ul>
      <button className={css.btn} onClick={handleDelete}>
        {t("contacts.delete")}
      </button>
      <Toaster />
    </section>
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

// {
//   "name": "Dima Prod",
//   "phoneNumber": "222-33-115",
//   "email": "Dima_Doe123@gmail.com",
//   "role": "business"
// }
