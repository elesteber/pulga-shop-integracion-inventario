import { useNavigate } from "react-router-dom";

import {
  TextField,
  Typography,
  Button,
  Box,
  FormLabel,
  FormControl,
} from "@mui/material";

const testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMywiZW1haWwiOiJjb3JyZW9AY29ycmVvLmNvbSIsInJvbGUiOiJ2ZW5kZWRvciIsImlhdCI6MTc2MDk3OTA4OH0.dcRUZpDddgMwobYV_82pYI62VkeUZIBnWFQ3_EJkvw0";

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    localStorage.setItem("jwt", testToken);
    navigate("/");
  }

  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            type="email"
            name="email"
            placeholder="tu@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained" color="secondary">
          Iniciar Sesión
        </Button>
      </Box>
    </>
  );
}
