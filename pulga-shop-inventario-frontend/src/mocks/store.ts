import { http, HttpResponse } from "msw";
import { CreateShopPayload, CreateShopResponse } from "../api/shop/createShop";
import { shopsInMemory as shops } from "./handlers";
import inventoryApi from "./paths";
import { GetStoreResponse } from "../api/shop/getShops";

export const storeHandlers = [
  http.post(inventoryApi("/tiendas"), async ({ request }) => {
    const body = (await request.clone().json()) as CreateShopPayload;

    const { nombre, descripcion, direccion, telefono, online, id_ciudad } =
      body;
    const id_tienda = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
    const fecha_creacion = new Date();

    const newShop: CreateShopResponse = {
      id_tienda,
      id_vendedor: 1,
      nombre,
      direccion,
      id_ciudad,
      descripcion,
      telefono,
      online,
      fecha_creacion,
    };
    shops.push(newShop);

    return HttpResponse.json(newShop);
  }),

  http.get<{ page: string; take: string }>(
    inventoryApi("/tiendas"),
    ({ request }) => {
      const url = new URL(request.url);
      const page = Number(url.searchParams.get("page")) || 1;
      const take = Number(url.searchParams.get("take")) || 5;

      const start = (page - 1) * take;
      const end = start + take;

      const paginatedShops = shops.slice(start, end);
      const itemCount = shops.length;
      const pageCount = Math.ceil(itemCount / take);

      const response: GetStoreResponse = {
        data: paginatedShops,
        meta: {
          page,
          take,
          itemCount: itemCount,
          pageCount: pageCount,
          hasPreviousPage: page > 1,
          hasNextPage: page < pageCount,
        },
      };

      return HttpResponse.json(response);
    }
  ),

  http.get<{ tiendaId: string }>(
    inventoryApi("/tiendas/:tiendaId"),
    ({ params }) => {
      const tiendaId = Number(params.tiendaId);

      const shop = shops.find((shop) => shop.id_tienda === tiendaId);
      if (!shop) {
        return HttpResponse.json(
          { message: "Shop not found" },
          { status: 404 }
        );
      }

      return HttpResponse.json(shop);
    }
  ),
];
