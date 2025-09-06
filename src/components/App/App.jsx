import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import { useEffect } from "react";
// BookingPage

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);

const ContactsPage = lazy(() =>
  import("../../pages/ContactsPage/ContactsPage")
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
import { refreshUser } from "../../redux/auth/operations";
import RestrictedRoute from "../../components/RestrictedRoute";
import PrivateRoute from "../../components/PrivateRoute";
import { selectIsRefreshing } from "../../redux/auth/selectors";

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  // запит на ТОКЕН isRefreshing (чи валідний токен?)
  useEffect(() => {
    dispatch(refreshUser());
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
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
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

//  UpdateBookingPage
