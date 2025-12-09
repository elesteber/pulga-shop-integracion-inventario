import api from "../../lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { Shop } from "../../types/api";

export function getShop(shopId: number): Promise<Shop> {
  return api.get<Shop>(`/tiendas/${shopId}`).then((res) => res.data);
}

export function useShop(shopId: number) {
  return useQuery({
    queryKey: ["tiendas", shopId],
    queryFn: () => getShop(shopId),
  });
}
