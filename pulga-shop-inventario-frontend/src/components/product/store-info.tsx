import { Box, Card, CardContent, Typography } from "@mui/material";
import { Shop } from "../../types/api";

export default function StoreInfo({ store }: { store: Shop }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        gap: { xs: 2, md: 2 },
      }}
    >
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            Información de la tienda
          </Typography>
          <Typography variant="body1">
            <b>Descripción:</b> {store.descripcion}
          </Typography>
          <Typography variant="body1">
            <b>Es online:</b> {store.online ? "Online" : "No online"}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            Información de contacto
          </Typography>
          <Typography variant="body1">
            <b>Dirección: </b> {store.direccion}
          </Typography>
          <Typography variant="body1">
            <b>Teléfono: </b> {store.telefono}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
