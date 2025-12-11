export type Shop = {
  id_tienda: number;
  id_vendedor: number;
  nombre: string;
  direccion: string;
  id_ciudad: number;
  descripcion: string;
  telefono: string;
  online: boolean;
  fecha_creacion: Date;
  // Should this have a product array?
  // producto: Product[];
};

export enum Condicion {
  NUEVO = "NUEVO",
  USADO = "USADO",
  REACONDICIONADO = "REACONDICIONADO",
}

export enum Categoria {
  ELECTRONICA = "ELECTRONICA",
  ROPA = "ROPA",
  CALZADO = "CALZADO",
  HOGAR = "HOGAR",
  JUGUETES = "JUGUETES",
  DEPORTES = "DEPORTES",
  LIBROS = "LIBROS",
  ALIMENTOS = "ALIMENTOS",
  BELLEZA = "BELLEZA",
  OFICINA = "OFICINA",
  AUTOMOTRIZ = "AUTOMOTRIZ",
  MASCOTAS = "MASCOTAS",
  GENERAL = "GENERAL",
}

export type Product = {
  sku: string;
  id_tienda: number;
  id_producto: number;
  nombre: string;
  descripcion: string;
  marca: string;
  costo: number;
  condicion: Condicion;
  stock: number;
  categoria: Categoria;
  fecha: Date;
  activo: boolean;
  peso: number;
  alto: number;
  largo: number;
  ancho: number;
  foto_referencia: string;
};

export type PaginationMeta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type Error = {
  message: string;
  error: string;
};
