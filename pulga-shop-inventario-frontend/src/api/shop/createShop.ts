import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../lib/api-client";
import { MutationConfig } from "../../lib/react-query";
import { Shop } from "../../types/api";

const createShopSchema = z.object({
  nombre: z
    .string()
    .min(3, { message: "Nombre debe tener al menos 3 caracteres." })
    .max(36, { message: "Nombre no puede tener más de 36 caracteres." }),

  descripcion: z
    .string()
    .min(3, { message: "Descripción debe tener al menos 3 caracteres." })
    .max(200, { message: "Descripción no puede tener más de 200 caracteres." }),

  direccion: z
    .string()
    .min(3, { message: "Dirección debe tener al menos 3 caracteres." })
    .max(100, { message: "Dirección no puede tener más de 100 caracteres." }),

  telefono: z.string().refine(
    (phone) => {
      const digits = phone.replace(/\s/g, "");
      return /^[0-9\s]+$/.test(phone) && digits.length === 9;
    },
    {
      message: "Teléfono debe tener 9 números",
    }
  ),

  online: z.boolean(),

  id_ciudad: z
    .number("Se espera una ciudad.")
    .min(1, { message: "Se espera una ciudad." }),
});

export const useCreateShopForm = () => {
  return useForm<z.infer<typeof createShopSchema>>({
    resolver: zodResolver(createShopSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      direccion: "",
      telefono: "",
    },
  });
};

export type CreateShopInput = z.infer<typeof createShopSchema>;

export type CreateShopPayload = {
  nombre: string;
  descripcion: string;
  direccion: string;
  telefono: string;
  online: boolean;
  id_ciudad: number;
};

// For now, they are the same. The response could later
// have a different shape.
export type CreateShopResponse = Shop;

function createShop(payload: CreateShopPayload): Promise<CreateShopResponse> {
  return api
    .post<CreateShopResponse>("/tiendas", { ...payload })
    .then((res) => res.data);
}

type UseCreateShopOptions = {
  mutationConfig?: MutationConfig<typeof createShop>;
};

export function useCreateShop({ mutationConfig }: UseCreateShopOptions) {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  const mutation = useMutation({
    mutationFn: createShop,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["tiendas"] });
      onSuccess?.(...args);
    },
    ...restConfig,
  });

  return mutation;
}
