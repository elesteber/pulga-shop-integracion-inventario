import { useState } from "react";
import { useParams } from "react-router-dom";

import { Link as ReactRouterLink } from "react-router-dom";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

import ProductsTable from "../../components/product/productsTable";
import CreateProduct from "../../components/product/createProduct";
import { useShop } from "../../api/shop/getShop";
import StoreInfo from "../../components/product/store-info";

export default function ShopPage() {
  const { tiendaId: storeId } = useParams<{ tiendaId: string }>();
  const { data: store, isLoading, isError } = useShop(+storeId!);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (isError) return "Error!";

  if (!store) return null;

  function handleGoToPosts() {
    const POSTS_URL = "http://localhost:4041/publicaciones";
    window.location.href = POSTS_URL;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "initial", md: "center" },
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          marginBottom: 2,
        }}
      >
        <div>
          <Typography variant="h4" gutterBottom>
            {store.nombre}
          </Typography>
          <Typography>
            Aquí puedes ver todos los productos de la tienda.
          </Typography>
          <Button onClick={handleGoToPosts}>Click aquí para ir a publicaciones</Button>
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            color="secondary"
            onClick={() => setIsModalOpen(true)}
          >
            Nuevo Producto
          </Button>
          <Button
            component={ReactRouterLink}
            to={`/app/tiendas/${+storeId!}/productos-eliminados`}
            startIcon={<Remove />}
            variant="outlined"
          >
            Productos eliminados
          </Button>
        </Box>
      </Box>
      <StoreInfo store={store} />
      <CreateProduct open={isModalOpen} setOpen={setIsModalOpen} />
      <ProductsTable storeId={+storeId!} />
    </Box>
  );
}
