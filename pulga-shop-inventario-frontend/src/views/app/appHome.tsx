import { useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CreateShop from "../../components/shop/createShop";
import StoreGrid from "../../components/shop/storeGrid";

export default function AppHome({}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "initial", md: "center" },
          gap: 4,
        }}
      >
        <div>
          <Typography variant="h4" gutterBottom>
            Tiendas
          </Typography>
          <Typography>
            Bienvenido, aquí puedes ver todas tus tiendas.
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="secondary"
          onClick={() => setIsModalOpen(true)}
        >
          Crear Tienda
        </Button>
      </Box>
      <CreateShop open={isModalOpen} setOpen={setIsModalOpen} />
      <StoreGrid />
    </Box>
  );
}
