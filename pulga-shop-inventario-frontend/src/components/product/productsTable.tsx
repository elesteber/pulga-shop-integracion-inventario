import { useState } from "react";

import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import EmptyState from "../EmptyState";
import { StyledCard } from "../Card";

import { useProducts } from "../../api/product/getProducts";
import { Box, CircularProgress, IconButton, Pagination } from "@mui/material";

import CreateIcon from "@mui/icons-material/Create";
import RemoveIcon from "@mui/icons-material/Remove";
import SegmentSharp from "@mui/icons-material/SegmentSharp";

import UpdateProduct from "./updateProduct";
import ProductDrawer from "./product-drawer";
import { Product } from "../../types/api";
import DeleteProduct from "./delete-product";

interface UpdateButtonProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
}

export default function ProductsTable({ storeId }: { storeId: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [page, setPage] = useState(1);
  const take = 8;
  let { data, isLoading, isError } = useProducts(page, take, storeId, true);

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
      <EmptyState
        title="No hay productos disponibles"
        body={
          'Parece que aún no hay productos. Puedes agregar tu propio producto haciendo clic en el \nbotón "Agregar" en la esquina superior derecha.'
        }
      />
    );

  function setProduct(sku: string) {
    const product = data!.data.find((p) => p.sku == sku);
    if (product) {
      setSelectedProduct(product);
    }
  }

  function UpdateButton({ params }: UpdateButtonProps) {
    return (
      <IconButton
        aria-label="update"
        onClick={() => {
          setProduct(params.row.sku);
          setIsModalOpen(true);
        }}
      >
        <CreateIcon />
      </IconButton>
    );
  }

  function DeleteButton({ params }: UpdateButtonProps) {
    return (
      <IconButton
        aria-label="delete"
        onClick={() => {
          setProduct(params.row.sku);
          setIsDeleteModalOpen(true);
        }}
      >
        <RemoveIcon />
      </IconButton>
    );
  }

  function DetailsButton({ params }: UpdateButtonProps) {
    return (
      <IconButton
        aria-label="details"
        onClick={() => {
          setProduct(params.row.sku);
          setIsDrawerOpen(true);
        }}
      >
        <SegmentSharp />
      </IconButton>
    );
  }

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
      field: "foto_referencia",
      headerName: "Foto",
      renderCell: (params) => {
        const defaultPicture =
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d";

        return (
          <div className="aspect-square max-h-full">
            <img src={params.value || defaultPicture} />
          </div>
        );
      },
    },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "id", headerName: "SKU", flex: 1 },
    { field: "marca", headerName: "Marca", flex: 1 },
    { field: "stock", headerName: "Stock", type: "number", flex: 1 },
    { field: "costo", headerName: "Costo", type: "number", flex: 1 },
    {
      field: "action",
      headerName: "Acción",
      type: "actions",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-2">
          <UpdateButton params={params} />
          <DetailsButton params={params} />
          <DeleteButton params={params} />
        </div>
      ),
    },
  ];

  return (
    <>
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
        <ProductDrawer
          open={isDrawerOpen}
          toggleDrawer={setIsDrawerOpen}
          product={selectedProduct}
        />
        <UpdateProduct
          open={isModalOpen}
          setOpen={setIsModalOpen}
          product={selectedProduct}
        />
        <DeleteProduct
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
          product={selectedProduct}
        />
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
    </>
  );
}
