import css from "./AllReservationsPage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContact } from "../../redux/contacts/operations";
import { selectLoading } from "../../redux/contacts/selectors";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useTranslation } from "react-i18next";
import CancelForm from "../../components/CancelForm/CancelForm";
import BookingContactList from "../../components/BookingContactList/BookingContactList";

export default function AllReservationsPage() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.cartTitle}>{t("contacts.titleCard")}</h1>
      <CancelForm />
      <div>{isLoading && "Request in progress..."}</div>
      <SearchBox />
      <BookingContactList />
    </div>
  );
}
