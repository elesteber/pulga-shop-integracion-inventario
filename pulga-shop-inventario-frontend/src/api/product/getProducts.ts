import { useQuery } from "@tanstack/react-query";

import api from "../../lib/api-client";
import { Product, PaginationMeta } from "../../types/api";

export type GetProductsResponse = {
  data: Product[];
  meta: PaginationMeta;
};

export function getProducts(
  page: number,
  take: number,
  storeId: number,
  activo: boolean
): Promise<GetProductsResponse> {
  return api
    .get<GetProductsResponse>("/productos", {
      params: { page, take, id_tienda: storeId, activo },
    })
    .then((res) => res.data);
}

export function useProducts(
  page = 1,
  take = 5,
  storeId: number,
  activo: boolean
) {
  return useQuery({
    queryKey: ["tiendas", storeId, "productos", { page, take, activo }],
    queryFn: () => getProducts(page, take, storeId, activo),
  });
}
