import css from "./AllReservationsPage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeBooking } from "../../redux/booking/operations";
import { selectLoadingBooking } from "../../redux/booking/selectors";
import BookingContactList from "../../components/BookingContactList/BookingContactList";
import Loader from "../../components/Loader/Loader";
import { selectToken } from "../../redux/auth/selectors";

export default function AllReservationsPage() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoadingBooking);
  const token = useSelector(selectToken) || localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchMeBooking());
  }, [dispatch, token]);

  return (
    <div className={css.container}>
      {isLoading ? <Loader /> : <BookingContactList />}
    </div>
  );
}

// {
//   "name": "Solomiya",
//   "email": "Solomiya_Doe123@gmail.com",
//   "password": "1223Solomiya"
// }

// {
//   "status": 201,
//   "message": "Successfully created a contact!",
//   "contact": {
//     "name": "Robb Djob",
//     "phoneNumber": "222-33-11",
//     "email": "Robb123@gmail.com",
//     "role": "business",
//     "userId": "68bf805f9e2e49c100c974ca",
//     "_id": "68bf815b9e2e49c100c974dd",
//     "createdAt": "2025-09-09T01:22:35.608Z",
//     "updatedAt": "2025-09-09T01:22:35.608Z"
//   }
// }

// sacsefful First booking by bisness id
// {
//   "status": 201,
//   "message": "Booking successfully created",
//   "data": {
//     "clientId": "68bf805f9e2e49c100c974ca",
//     "businessId": "68bf821a9e2e49c100c974e5",
//     "date": "2025-09-09",
//     "time": "10:00",
//     "status": "pending",
//     "_id": "68bf82e69e2e49c100c974ed",
//     "createdAt": "2025-09-09T01:29:10.988Z",
//     "updatedAt": "2025-09-09T01:29:10.988Z",
//     "__v": 0
//   }
// }

// ALL object by Bookings :

// [
//   {
//     "_id": "68bf82e69e2e49c100c974ed",
//     "clientId": "68bf805f9e2e49c100c974ca",
//     "businessId": "68bf821a9e2e49c100c974e5",
//     "date": "2025-09-09",
//     "time": "10:00",
//     "status": "pending",
//     "createdAt": "2025-09-09T01:29:10.988Z",
//     "updatedAt": "2025-09-09T01:29:10.988Z",
//     "__v": 0
//   },
//   {
//     "_id": "68bf83829e2e49c100c974f1",
//     "clientId": "68bf805f9e2e49c100c974ca",
//     "businessId": "68bf815b9e2e49c100c974dd",
//     "date": "2025-09-09",
//     "time": "12:00",
//     "status": "pending",
//     "createdAt": "2025-09-09T01:31:46.549Z",
//     "updatedAt": "2025-09-09T01:31:46.549Z",
//     "__v": 0
//   },
//   {
//     "_id": "68bf83b19e2e49c100c974f5",
//     "clientId": "68bf805f9e2e49c100c974ca",
//     "businessId": "68bf81d49e2e49c100c974e1",
//     "date": "2025-09-10",
//     "time": "13:00",
//     "status": "pending",
//     "createdAt": "2025-09-09T01:32:33.638Z",
//     "updatedAt": "2025-09-09T01:32:33.638Z",
//     "__v": 0
//   },
//   {
//     "_id": "68bf83f49e2e49c100c974f9",
//     "clientId": "68bf805f9e2e49c100c974ca",
//     "businessId": "68bf811b9e2e49c100c974d9",
//     "date": "2025-09-10",
//     "time": "15:00",
//     "status": "pending",
//     "createdAt": "2025-09-09T01:33:40.920Z",
//     "updatedAt": "2025-09-09T01:33:40.920Z",
//     "__v": 0
//   }
// ]
