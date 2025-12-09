import { useQuery } from "@tanstack/react-query";

import api from "../../lib/api-client";
import { Shop, PaginationMeta } from "../../types/api";

export type GetStoreResponse = {
  data: Shop[];
  meta: PaginationMeta;
};

export function getShops(page: number, take = 5): Promise<GetStoreResponse> {
  return api
    .get<GetStoreResponse>("/tiendas", {
      params: { page, take },
    })
    .then((res) => res.data);
}

export function useShops(page = 1, take = 5) {
  return useQuery({
    queryKey: ["tiendas", { page, take }],
    queryFn: () => getShops(page, take),
  });
}
