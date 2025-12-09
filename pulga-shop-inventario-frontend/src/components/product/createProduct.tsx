import axios from "axios";

import TextField from "@mui/material/TextField";
import ResponsiveModal from "../ResponsiveModal";

import {
  CreateProductInput,
  useCreateProduct,
  useCreateProductForm,
} from "../../api/product/createProduct";
import { useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  MenuItem,
  Select,
} from "@mui/material";
import { Categoria, Condicion } from "../../types/api";
import { Controller } from "react-hook-form";
import { PRODUCTO_ERROR_CODES } from "../../mocks/errors";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateProduct({ open, setOpen }: Props) {
  const { tiendaId } = useParams<{ tiendaId: string }>();
  const storeId = +tiendaId!;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useCreateProductForm();

  const createProductMutation = useCreateProduct({
    storeId,
    mutationConfig: {
      onSuccess: () => {
        resetForm();
        setOpen(false);
      },
      onError: (error) => {
        console.error(error);
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data.error);
        } else {
          console.error("Unexpected error:", error);
        }
      },
    },
  });

  const onSubmit = (data: CreateProductInput) => {
    const newData = { ...data, id_tienda: Number(storeId) };
    createProductMutation.mutate(newData);
  };

  return (
    <ResponsiveModal
      title="Crear producto"
      triggerButtonText="Crear"
      open={open}
      isSubmitDisabled={createProductMutation.isPending}
      setOpen={setOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)} id="subscription-form">
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="marca">Nombre</FormLabel>
          <TextField
            {...register("nombre")}
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Auriculares Inalámbricos"
            autoFocus
            required
            fullWidth
            variant="outlined"
            error={!!errors.nombre}
            helperText={errors.nombre ? errors.nombre.message : ""}
          />
          <FormHelperText error={!!createProductMutation.error}>
            {axios.isAxiosError(createProductMutation.error) &&
            createProductMutation.error?.response
              ? createProductMutation.error.response.data.error ===
                PRODUCTO_ERROR_CODES.PRODUCTO_YA_EXISTE
                ? "Ya existe un producto con ese nombre"
                : "Error inesperado."
              : ""}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="marca">Descripción</FormLabel>
          <TextField
            {...register("descripcion")}
            id="descripcion"
            name="descripcion"
            placeholder="Auriculares Bluetooth con cancelación de ruido y sonido envolvente"
            type="text"
            autoFocus
            required
            fullWidth
            variant="outlined"
            error={!!errors.descripcion}
            helperText={errors.descripcion ? errors.descripcion.message : ""}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="marca">Marca</FormLabel>
          <TextField
            {...register("marca")}
            id="marca"
            type="text"
            name="marca"
            placeholder="TechWave"
            autoFocus
            required
            fullWidth
            variant="outlined"
            error={!!errors.marca}
            helperText={errors.marca ? errors.marca.message : ""}
          />
        </FormControl>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0, md: 2 },
          }}
        >
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel htmlFor="stock">Stock</FormLabel>
            <TextField
              {...register("stock", { valueAsNumber: true })}
              id="stock"
              type="number"
              name="stock"
              placeholder="10"
              autoFocus
              required
              fullWidth
              variant="outlined"
              error={!!errors.stock}
              helperText={errors.stock ? errors.stock.message : ""}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="costo">Costo</FormLabel>
            <TextField
              {...register("costo", { valueAsNumber: true })}
              id="costo"
              type="number"
              name="costo"
              placeholder="10"
              autoFocus
              required
              fullWidth
              variant="outlined"
              error={!!errors.costo}
              helperText={errors.costo ? errors.costo.message : ""}
            />
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0, md: 2 },
          }}
        >
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel htmlFor="condicion">Condición</FormLabel>
            <Controller
              name="condicion"
              control={control}
              rules={{ required: "Condición es requerida." }}
              render={({ field }) => (
                <Select {...field} id="condicion" required fullWidth>
                  {Object.values(Condicion).map((condicion) => (
                    <MenuItem key={condicion} value={condicion}>
                      {condicion}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>
              {errors.condicion ? errors.condicion.message : ""}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel htmlFor="condicion">Categoría</FormLabel>
            <Controller
              name="categoria"
              control={control}
              rules={{ required: "Categoría es requerida." }}
              render={({ field }) => (
                <Select {...field} id="cateogria" required fullWidth>
                  {Object.values(Categoria).map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>
              {errors.categoria ? errors.categoria.message : ""}
            </FormHelperText>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 0, md: 2 },
          }}
        >
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel htmlFor="stock">Peso (kg)</FormLabel>
            <TextField
              {...register("peso", { valueAsNumber: true })}
              id="peso"
              type="number"
              name="peso"
              placeholder="5"
              autoFocus
              required
              fullWidth
              variant="outlined"
              error={!!errors.peso}
              helperText={errors.peso ? errors.peso.message : ""}
              InputProps={{
                inputProps: { step: "0.1", min: "0.1" },
              }}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="costo">Alto (cm)</FormLabel>
            <TextField
              {...register("alto", { valueAsNumber: true })}
              id="alto"
              type="number"
              name="alto"
              placeholder="20"
              autoFocus
              required
              fullWidth
              variant="outlined"
              error={!!errors.alto}
              helperText={errors.alto ? errors.alto.message : ""}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="costo">Largo (cm)</FormLabel>
            <TextField
              {...register("largo", { valueAsNumber: true })}
              id="largo"
              type="number"
              name="largo"
              placeholder="15"
              autoFocus
              required
              fullWidth
              variant="outlined"
              error={!!errors.largo}
              helperText={errors.largo ? errors.largo.message : ""}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="costo">Ancho (cm)</FormLabel>
            <TextField
              {...register("ancho", { valueAsNumber: true })}
              id="ancho"
              type="number"
              name="ancho"
              placeholder="30"
              autoFocus
              required
              fullWidth
              variant="outlined"
              error={!!errors.ancho}
              helperText={errors.ancho ? errors.ancho.message : ""}
            />
          </FormControl>
        </Box>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel htmlFor="imagen">Imagen de referencia</FormLabel>
          <Input
            {...register("file")}
            id="imagen"
            type="file"
            name="file"
            autoFocus
            required
          />
          {errors.file && (
            <FormHelperText error>
              {String(errors.file.message)}
            </FormHelperText>
          )}
        </FormControl>
      </form>
    </ResponsiveModal>
  );
}
