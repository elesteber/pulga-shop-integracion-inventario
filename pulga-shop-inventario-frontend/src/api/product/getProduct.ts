import { useQuery } from "@tanstack/react-query";

import api from "../../lib/api-client";
import { Product } from "../../types/api";

export type GetProductResponse = Product;

export function getProduct(
  storeId: number,
  sku: string
): Promise<GetProductResponse> {
  return api
    .get<GetProductResponse>(`/productos/${sku}`, {
      params: { storeId },
    })
    .then((res) => res.data);
}

export function useProduct(storeId: number, sku: string) {
  return useQuery({
    queryKey: ["tiendas", storeId, "productos", sku],
    queryFn: () => getProduct(storeId, sku),
  });
}
