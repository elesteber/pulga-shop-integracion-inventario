import AppLayout from "../layouts/app/AppLayout";

export default function AuthRoutes() {
  if (import.meta.env.VITE_SKIP_AUTH === "true") {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJWRU5EXzAwMSIsImVtYWlsIjoiY29ycmVvQGNvcnJlby5jb20iLCJyb2xlIjoidmVuZGVkb3IiLCJpYXQiOjE3NjU0MjM1NjUsImV4cCI6MTc2NTUwOTk2NX0.fEFG2K84g9npssWFzTfJtufvr6MYvjACLH66oBxRAcY";
    localStorage.setItem("jwt", token);
  }

  const isAuthenticated = Boolean(localStorage.getItem("jwt"));

  if (!isAuthenticated) {
    const AUTH_URL = "http://localhost:5170";
    window.location.href = AUTH_URL;
    return
  }

  return <AppLayout />;
}
