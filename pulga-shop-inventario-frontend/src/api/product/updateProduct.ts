import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../lib/api-client";
import { MutationConfig } from "../../lib/react-query";
import { Product } from "../../types/api";
import { createProductSchema } from "./createProduct";

const MAX_FILE_SIZE = 10000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const updateProductSchema = createProductSchema.omit({
  nombre: true,
  condicion: true,
  marca: true,
  categoria: true
}).extend({
  stock: z.number().min(0, { message: "El stock debe ser al menos 0." }),
  file: z
    .instanceof(FileList)
    .refine(
      (files) =>
        files.length === 0 ||
        (files.length === 1 && files[0].size <= MAX_FILE_SIZE),
      `El tamaño máximo de la imagen es 10MB.`
    )
    .refine(
      (files) =>
        files.length === 0 ||
        (files.length === 1 && ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type)),
      "Solo se admiten formatos .jpg, .jpeg, .png y .webp."
    )
    .optional(),
});

export const useUpdateProductForm = (defaultValues: Product | null) => {
  return useForm<z.infer<typeof updateProductSchema>>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      descripcion: defaultValues?.descripcion ?? "",
      stock: defaultValues?.stock ?? 0,
      costo: defaultValues?.costo ?? 0,
      peso: defaultValues?.peso ?? 0,
      alto: defaultValues?.alto ?? 0,
      largo: defaultValues?.largo ?? 0,
      ancho: defaultValues?.ancho ?? 0,
    },
  });
};

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export type UpdateProductType = {
  descripcion: string;
  stock: number;
  costo: number;
  peso: number;
  alto: number;
  largo: number;
  ancho: number;
};

export type UpdateProductPayload = {
  sku: string;
  data: UpdateProductType;
};

export type UpdateProductResponse = Product;

function updateProduct(
  payload: UpdateProductPayload
): Promise<UpdateProductResponse> {
  return api
    .patch<UpdateProductResponse>(`/productos/${payload.sku}`, {
      ...payload.data,
    })
    .then((res) => res.data);
}

type UseUpdateProductsOptions = {
  storeId: number;
  mutationConfig?: MutationConfig<typeof updateProduct>;
};

export function useUpdateProduct({
  storeId,
  mutationConfig,
}: UseUpdateProductsOptions) {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        //queryKey: ["tiendas", storeId, "productos", productSku],
        queryKey: ["tiendas", storeId, "productos"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });

  return mutation;
}
