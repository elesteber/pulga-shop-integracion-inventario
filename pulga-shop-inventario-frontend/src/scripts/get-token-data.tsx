import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  data: {
    name?: string;
  };
}

export default function getTokenData(): JwtPayload | null {
  const token: string | null = localStorage.getItem("jwt");

  if (!token) return null;
  const decoded: JwtPayload = jwtDecode<JwtPayload>(token);

  return decoded;
}
