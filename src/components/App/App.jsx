import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import { useEffect } from "react";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
const ContactsPage = lazy(() =>
  import("../../pages/ContactsPage/ContactsPage")
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
