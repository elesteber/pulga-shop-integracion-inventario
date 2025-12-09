import { Navigate } from "react-router-dom";

import BlankLayout from "../layouts/blank-layout/BlankLayout";
import AuthLayout from "../layouts/auth/AuthLayout";
import Error from "../views/authentication/Error";

import Login from "../views/authentication/Login";
import Register from "../views/authentication/Register";

import AuthRoutes from "./../components/AuthRoutes";
import AppHome from "./../views/app/appHome";
import StorePage from "../views/app/storePage";
import DeletedProducts from "../views/app/deleted-products";

const Router = [
  {
    path: "/error",
    element: <BlankLayout />,
    children: [{ path: "404", element: <Error /> }],
  },
  {
    // For testing only
    path: "/auth-test",
    element: <AuthLayout />,
    children: [
      { path: "", exact: true, element: <Navigate to="/auth-test/login" /> },
      { path: "login", exact: true, element: <Login /> },
      { path: "register", exact: true, element: <Register /> },
      { path: "*", element: <Navigate to="/error/404" /> },
      { path: "404", exact: true, element: <Error /> },
    ],
  },
  {
    path: "/",
    element: <AuthRoutes />,
    children: [
      { path: "", exact: true, element: <AppHome /> },
      { path: "app/tiendas/:tiendaId", exact: true, element: <StorePage /> },
      {
        path: "app/tiendas/:tiendaId/productos-eliminados",
        exact: true,
        element: <DeletedProducts />,
      },
    ],
  },
  {
    path: "/error",
    element: <BlankLayout />,
    children: [
      { path: "*", element: <Navigate to="/error/404" /> },
      { path: "404", exact: true, element: <Error /> },
    ],
  },
];

export default Router;
