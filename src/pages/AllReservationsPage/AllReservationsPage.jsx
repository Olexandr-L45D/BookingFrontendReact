import css from "./AllReservationsPage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeBooking } from "../../redux/booking/operations";
import { selectLoadingBooking } from "../../redux/booking/selectors";
import { useTranslation } from "react-i18next";
import CancelForm from "../../components/CancelForm/CancelForm";
import BookingContactList from "../../components/BookingContactList/BookingContactList";
import Loader from "../../components/Loader/Loader";
import { selectToken } from "../../redux/auth/selectors";

export default function AllReservationsPage() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoadingBooking);
  const { t } = useTranslation();
  const token = useSelector(selectToken) || localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchMeBooking());
  }, [dispatch, token]);

  return (
    <div className={css.container}>
      <h1 className={css.cartTitle}>{t("contacts.titleCard")}</h1>
      <CancelForm />
      {isLoading ? <Loader /> : <BookingContactList />}
    </div>
  );
}
