import { useState } from "react";

import { Box, CircularProgress, Grid2, Pagination } from "@mui/material";

import { StoreGridItem } from "./storeGridItem";
import EmptyState from "../EmptyState";

import { Shop } from "../../types/api";
import { useShops } from "../../api/shop/getShops";

export default function StoreGrid() {
  const [page, setPage] = useState(1);
  const take = 4;
  let { data, isLoading, isError } = useShops(page, take);

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
  if (!data) return null;

  const noShops = data?.data.length === 0;
  if (noShops)
    return (
      <EmptyState
        title="No hay tiendas disponibles"
        body={
          'Parece que aún no hay tiendas. Puedes crear tu propia tienda haciendo clic en el \nbotón "Crear" en la esquina superior derecha.'
        }
      />
    );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <>
      <Grid2 container spacing={2} columns={12}>
        {data?.data.map((s: Shop) => {
          return <StoreGridItem data={s} key={s.id_tienda} />;
        })}
      </Grid2>
      <Box display="flex" justifyContent="center">
        <Pagination
          count={data ? Math.ceil(data.meta.pageCount) : 0}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </>
  );
}
