import AppLayout from "../layouts/app/AppLayout";

function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp ? payload.exp > now : true;
  } catch {
    return false;
  }
}

export default function AuthRoutes() {
  const storedToken = localStorage.getItem("jwt");

  if (storedToken && !isTokenValid(storedToken)) {
    localStorage.removeItem("jwt");
  }

  if (import.meta.env.VITE_SKIP_AUTH === "true" && !localStorage.getItem("jwt")) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJWRU5EXzAwMSIsImVtYWlsIjoiY29ycmVvQGNvcnJlby5jb20iLCJyb2xlIjoidmVuZGVkb3IiLCJpYXQiOjE3NjU4OTQzODh9.AyrFSZFh-5FIQH35F5SlaiBkvUEQLzsqCTLgH9AD66M";
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
