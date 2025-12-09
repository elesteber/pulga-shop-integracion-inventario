import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

function Home() {
  return (
    <Box className="flex justify-center items-center h-screen">
      <Card sx={{ maxWidth: 400, width: "100%" }}>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ marginBottom: 2 }}
            textAlign="center"
          >
            Pulga Shop - Inventario
          </Typography>
          <Box className="flex flex-col gap-2">
            <Button
              component={Link}
              to="/auth/login"
              variant="contained"
              color="secondary"
            >
              Iniciar Sesión
            </Button>
            <Button
              component={Link}
              to="/auth/register"
              variant="outlined"
              color="primary"
            >
              Registrarse
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Home;
