import AppLayout from "../layouts/app/AppLayout";

export default function AuthRoutes() {
  const isAuthenticated = Boolean(localStorage.getItem("jwt"));

  if (!isAuthenticated) {
    const AUTH_URL = "http://localhost:5170";
    window.location.href = AUTH_URL;
    return
  }

  return <AppLayout />;
}
