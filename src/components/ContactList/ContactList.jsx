import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { selectOutContacts } from "../../redux/contacts/selectors";
import { useSelector } from "react-redux";

export default function ContactList() {
  const items = useSelector(selectOutContacts);
  if (!Array.isArray(items)) {
    return <p>❌ Contacts not loaded</p>;
  }

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {items.map(contact => (
          <li className={css.item} key={contact.id}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </div>
  );
}
