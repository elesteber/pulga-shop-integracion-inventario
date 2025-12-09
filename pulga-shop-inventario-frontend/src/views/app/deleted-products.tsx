import { useState } from "react";
import { useParams } from "react-router-dom";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, CircularProgress, Typography, Pagination } from "@mui/material";

import EmptyState from "../../components/EmptyState";
import { StyledCard } from "../../components/Card";

import { useProducts } from "../../api/product/getProducts";

export default function DeletedProducts() {
  const { tiendaId: storeId } = useParams<{ tiendaId: string }>();

  const [page, setPage] = useState(1);
  const take = 8;
  const activeProducts = false;
  let { data, isLoading, isError } = useProducts(
    page,
    take,
    Number(storeId),
    activeProducts
  );

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
  if (!data.data) return null;

  const noProducts = !data.data.length;
  if (noProducts)
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h4" gutterBottom>
          Productos eliminados
        </Typography>
        <EmptyState
          title="No hay productos eliminados disponibles"
          body={"Parece que aún no hay productos eliminados."}
        />
      </Box>
    );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const rows: any = [];
  for (const p of data.data) {
    const newColumn = { id: p.sku, ...p };
    rows.push(newColumn);
  }

  const columns: GridColDef[] = [
    {
      field: "foto",
      headerName: "Foto",
      renderCell: () => {
        return (
          <div className="aspect-square max-h-full">
            <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d" />
          </div>
        );
      },
    },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "id", headerName: "SKU", flex: 1 },
    { field: "marca", headerName: "Marca", flex: 1 },
    { field: "stock", headerName: "Stock", type: "number", flex: 1 },
    { field: "costo", headerName: "Costo", type: "number", flex: 1 },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" gutterBottom>
        Productos eliminados
      </Typography>
      <StyledCard>
        <Paper
          sx={{
            width: "100%",
            outline: "3px solid",
            outlineColor: "hsla(210, 98%, 48%, 0.5)",
            outlineOffset: "2px",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            style={{ marginTop: 20, minHeight: 200 }}
          />
        </Paper>
      </StyledCard>
      <Box display="flex" justifyContent="center">
        <Pagination
          count={data.meta.pageCount}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}
