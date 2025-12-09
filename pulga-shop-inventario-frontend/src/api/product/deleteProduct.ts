import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api-client";

function deleteProduct(sku: string): Promise<void> {
  return api.delete<void>(`/productos/${sku}`).then((res) => res.data);
}

export function useDeleteProduct(storeId: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tiendas", storeId, "productos"],
      });
    },
  });

  return mutation;
}
