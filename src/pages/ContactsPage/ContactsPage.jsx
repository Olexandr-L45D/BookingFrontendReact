import css from "./ContactsPage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactList from "../../components/ContactList/ContactList";
import { fetchContact } from "../../redux/contacts/operations";
import { selectLoading } from "../../redux/contacts/selectors";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useTranslation } from "react-i18next";
import { selectToken } from "../../redux/auth/selectors";
import Loader from "../../components/Loader/Loader";

export default function ContactsPage() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);
  const { t } = useTranslation();

  const token = useSelector(selectToken) || localStorage.getItem("token");

  useEffect(() => {
    if (!token) return; // чекати токен
    dispatch(fetchContact());
  }, [dispatch, token]);

  return (
    <section className={css.container}>
      <h1 className={css.cartTitle}>{t("contacts.titleCard")}</h1>
      <SearchBox />
      {isLoading ? <Loader /> : <ContactList />}
    </section>
  );
}

// {
//   "status": 200,
//   "message": "Successfully found contacts",
//   "data": {
//     "data": [
//       {
//         "_id": "68bf80ec9e2e49c100c974d5",
//         "name": "Johni Doni",
//         "phoneNumber": "222-33-111",
//         "email": "Johni_Doe123@gmail.com",
//         "role": "client",
//         "userId": "68bf805f9e2e49c100c974ca",
//         "createdAt": "2025-09-09T01:20:44.281Z",
//         "updatedAt": "2025-09-09T01:20:44.281Z"
//       },
//       {
//         "_id": "68bf811b9e2e49c100c974d9",
//         "name": "Johns Dons",
//         "phoneNumber": "222-33-115",
//         "email": "Johns_Doe123@gmail.com",
//         "role": "business",
//         "userId": "68bf805f9e2e49c100c974ca",
//         "createdAt": "2025-09-09T01:21:31.966Z",
//         "updatedAt": "2025-09-09T01:21:31.966Z"
//       },
//       {
//         "_id": "68bf81d49e2e49c100c974e1",
//         "name": "Molli",
//         "phoneNumber": "522-33-115",
//         "email": "Molli_Doe123@gmail.com",
//         "role": "business",
//         "userId": "68bf805f9e2e49c100c974ca",
//         "createdAt": "2025-09-09T01:24:36.049Z",
//         "updatedAt": "2025-09-09T01:24:36.049Z"
//       },
//       {
//         "_id": "68bf815b9e2e49c100c974dd",
//         "name": "Robb Djob",
//         "phoneNumber": "222-33-11",
//         "email": "Robb123@gmail.com",
//         "role": "business",
//         "userId": "68bf805f9e2e49c100c974ca",
//         "createdAt": "2025-09-09T01:22:35.608Z",
//         "updatedAt": "2025-09-09T01:22:35.608Z"
//       },
//       {
//         "_id": "68bf821a9e2e49c100c974e5",
//         "name": "Svager Dager",
//         "phoneNumber": "422-33-14",
//         "email": "Svager_Doe123@gmail.com",
//         "role": "business",
//         "userId": "68bf805f9e2e49c100c974ca",
//         "createdAt": "2025-09-09T01:25:46.588Z",
//         "updatedAt": "2025-09-09T01:25:46.588Z"
//       }
//     ],
//     "page": 1,
//     "perPage": 10,
//     "totalItems": 5,
//     "totalPages": 1,
//     "hasNextPage": false,
//     "hasPreviousPage": false
//   }
// }
