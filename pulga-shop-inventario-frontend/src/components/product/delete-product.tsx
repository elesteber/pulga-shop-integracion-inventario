import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import ResponsiveModal from "../ResponsiveModal";
import { useDeleteProduct } from "../../api/product/deleteProduct";
import { Product } from "../../types/api";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product | null;
}

export default function DeleteProduct({ open, setOpen, product }: Props) {
  const { tiendaId } = useParams<{ tiendaId: string }>();
  const storeId = +tiendaId!;

  const deleteProductMutation = useDeleteProduct(storeId);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    deleteProductMutation.mutate(product!.sku);
  };

  return (
    <ResponsiveModal
      title="Eliminar producto"
      triggerButtonText="Eliminar"
      open={open}
      isSubmitDisabled={deleteProductMutation.isPending}
      setOpen={setOpen}
    >
      <form onSubmit={onSubmit} id="subscription-form">
        <Typography>Esta acción es permanente.</Typography>
      </form>
    </ResponsiveModal>
  );
}
