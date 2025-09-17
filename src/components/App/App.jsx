import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import { useEffect } from "react";
// UpdateContactPage
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);

const CreateContactPage = lazy(() =>
  import("../../pages/CreateContactPage/CreateContactPage")
);
const ContactsPage = lazy(() =>
  import("../../pages/ContactsPage/ContactsPage")
);
const UpdateContactPage = lazy(() =>
  import("../../pages/UpdateContactPage/UpdateContactPage")
);

const BookingPage = lazy(() => import("../../pages/BookingPage/BookingPage"));

const AllReservationsPage = lazy(() =>
  import("../../pages/AllReservationsPage/AllReservationsPage")
);
const UpdateBookingPage = lazy(() =>
  import("../../pages/UpdateBookingPage/UpdateBookingPage")
);
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

import { Layout } from "../Layout/Layout";
import { refreshUser, setAuthHeader } from "../../redux/auth/operations";
import RestrictedRoute from "../../components/RestrictedRoute";
import PrivateRoute from "../../components/PrivateRoute";
import { selectIsRefreshing } from "../../redux/auth/selectors";

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  // запит на ТОКЕН isRefreshing (чи валідний токен?)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthHeader(token); // важливо: встановити хедер одразу
      //  диспатчити refreshUser після встановлення
      dispatch(refreshUser());
    } else {
      // якщо токена немає — refreshUser не має запускатись
    }
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user ...</b>
  ) : (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<RegistrationPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="/createContact"
            element={
              <PrivateRoute
                redirectTo="/login"
                component={<CreateContactPage />}
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />
          <Route
            path="/:id/updateContact"
            element={
              <PrivateRoute
                redirectTo="/login"
                component={<UpdateContactPage />}
              />
            }
          />
          <Route
            path="/booking"
            element={
              <PrivateRoute redirectTo="/login" component={<BookingPage />} />
            }
          />
          <Route
            path="/booking/me"
            element={
              <PrivateRoute
                redirectTo="/login"
                component={<AllReservationsPage />}
              />
            }
          />
          <Route
            path="/:id/update"
            element={
              <PrivateRoute
                redirectTo="/login"
                component={<UpdateBookingPage />}
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

//
//
//
//
//
//при потребі показати при першому завантаженні чи при підвантаженнях рекламний банер чи короткий відео ролик додаю в
// <Suspense fallback={ шматок JSX виразу
//    <video autoPlay muted
// <Suspense
//   fallback={
//     <div className="flex items-center justify-center h-screen bg-black">
//       <video autoPlay muted loop className="w-full h-full object-cover">
//         <source src="/ads/short-ad.mp4" type="video/mp4" />
//       </video>
//     </div>
//   }
// >
//   <Routes>{/* маршрути */}</Routes>
// </Suspense>;
// <img src="/promo.png"
// <Suspense
//   fallback={
//     <div className="flex flex-col items-center justify-center h-screen">
//       <img src="/promo.png" alt="Promo" className="w-64 h-auto" />
//       <p className="mt-4 text-lg">Завантажуємо сторінку...</p>
//     </div>
//   }
// >
//   <Routes>{/* твої маршрути */}</Routes>
// </Suspense>;
