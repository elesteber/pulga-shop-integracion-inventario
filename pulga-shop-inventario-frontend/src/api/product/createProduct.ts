import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../lib/api-client";
import { MutationConfig } from "../../lib/react-query";
import { Condicion, Categoria, Product, Error } from "../../types/api";

const MAX_FILE_SIZE = 10000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createProductSchema = z.object({
  nombre: z
    .string()
    .min(3, { message: "Nombre debe tener al menos 3 caracteres." })
    .max(36, { message: "Nombre no puede tener más de 36 caracteres." }),

  descripcion: z
    .string()
    .min(3, { message: "Descripción debe tener al menos 3 caracteres." })
    .max(200, { message: "Descripción no puede tener más de 200 caracteres." }),

  stock: z.number().min(1, { message: "El stock debe ser al menos 1." }),
  costo: z.number().min(1, { message: "El costo debe ser al menos 1." }),

  condicion: z.enum([
    Condicion.NUEVO,
    Condicion.REACONDICIONADO,
    Condicion.USADO,
  ]),

  marca: z
    .string()
    .min(3, { message: "Marca debe tener al menos 3 caracteres." })
    .max(36, { message: "Marca no puede tener más de 36 caracteres." }),

  categoria: z.enum([
    Categoria.ELECTRÓNICA,
    Categoria.ROPA,
    Categoria.CALZADO,
    Categoria.HOGAR,
    Categoria.JUGUETES,
    Categoria.DEPORTES,
    Categoria.LIBROS,
    Categoria.ALIMENTOS,
    Categoria.BELLEZA,
    Categoria.OFICINA,
    Categoria.AUTOMOTRIZ,
    Categoria.MASCOTAS,
    Categoria.GENERAL,
  ]),

  file: z
    .instanceof(FileList)
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `El tamaño máximo de la imagen es 10MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Solo se admiten formatos .jpg, .jpeg, .png y .webp."
    ),

  peso: z
    .number()
    .min(0.1, { message: "El peso debe ser mayor que 0.1" })
    .refine((val) => val === Math.round(val * 10) / 10, {
      message: "El peso debe tener un máximo de un decimal.",
    }),
  alto: z.number().min(1, { message: "El alto debe ser al menos 1." }),
  largo: z.number().min(1, { message: "El largo debe ser al menos 1." }),
  ancho: z.number().min(1, { message: "El ancho debe ser al menos 1." }),
});

export const useCreateProductForm = () => {
  return useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      stock: 0,
      costo: 0,
      condicion: Condicion.NUEVO,
      categoria: Categoria.ELECTRÓNICA,
      peso: 0,
      alto: 0,
      largo: 0,
      ancho: 0,
    },
  });
};

export type CreateProductInput = z.infer<typeof createProductSchema>;

export type CreateProductPayload = {
  nombre: string;
  descripcion: string;
  stock: number;
  costo: number;
  id_tienda: number;
  condicion: Condicion;
  marca: string;
  categoria: Categoria;
  file: FileList;
  peso: number;
  alto: number;
  largo: number;
  ancho: number;
};

export type CreateProductResponse = Product | Error;

function createProduct(
  payload: CreateProductPayload
): Promise<CreateProductResponse> {
  const newPayload = new FormData();

  newPayload.append("nombre", payload.nombre);
  newPayload.append("descripcion", payload.descripcion);
  newPayload.append("stock", payload.stock.toString());
  newPayload.append("costo", payload.costo.toString());
  newPayload.append("id_tienda", payload.id_tienda.toString());
  newPayload.append("condicion", payload.condicion);
  newPayload.append("marca", payload.marca);
  newPayload.append("categoria", payload.categoria);
  newPayload.append("peso", payload.peso.toString());
  newPayload.append("alto", payload.alto.toString());
  newPayload.append("largo", payload.largo.toString());
  newPayload.append("ancho", payload.ancho.toString());

  if (payload.file && payload.file[0]) {
    newPayload.append("file", payload.file[0]);
  }

  console.log(newPayload);

  return api
    .post<CreateProductResponse>("/productos", newPayload)
    .then((res) => res.data);
}

type UseCreateProductsOptions = {
  storeId: number;
  mutationConfig?: MutationConfig<typeof createProduct>;
};

export function useCreateProduct({
  storeId,
  mutationConfig,
}: UseCreateProductsOptions) {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["tiendas", storeId, "productos"],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });

  return mutation;
}
