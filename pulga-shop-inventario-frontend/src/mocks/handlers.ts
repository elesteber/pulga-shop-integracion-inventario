import { storeHandlers } from "./store";
import { productsHandlers } from "./products";
import { Condicion, Categoria, Product, Shop } from "../types/api";

export let shopsInMemory: Shop[] = [
  {
    id_tienda: 1,
    id_vendedor: 1,
    nombre: "Tienda 1",
    descripcion: "Esta es la tienda 1",
    direccion: "Direccion 1",
    id_ciudad: 20,
    telefono: "123456789",
    online: true,
    fecha_creacion: new Date(),
  },
  {
    id_tienda: 2,
    id_vendedor: 1,
    nombre: "Tienda 2",
    descripcion: "Esta es la tienda 2",
    direccion: "Direccion 2",
    id_ciudad: 21,
    telefono: "987654321",
    online: false,
    fecha_creacion: new Date(),
  },
];

export const pic1 =
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d";

export let productsInMemory: Product[] = [
  {
    sku: "123456",
    id_tienda: 1,
    id_producto: 1,
    nombre: "Producto X",
    descripcion: "Desc. Producto",
    marca: "Marca ABC",
    costo: 1000,
    condicion: Condicion.NUEVO,
    stock: 10,
    categoria: Categoria.ELECTRÓNICA,
    activo: true,
    fecha: new Date(),
    peso: 10,
    alto: 15,
    largo: 20,
    ancho: 25,
    foto_referencia: pic1
  },
  {
    sku: "1234567",
    id_tienda: 1,
    id_producto: 2,
    nombre: "Producto Y",
    descripcion: "Desc. Producto",
    marca: "Marca ABC",
    costo: 2000,
    condicion: Condicion.REACONDICIONADO,
    stock: 20,
    categoria: Categoria.BELLEZA,
    activo: true,
    fecha: new Date(),
    peso: 10,
    alto: 15,
    largo: 20,
    ancho: 25,
    foto_referencia: pic1
  },
  {
    sku: "12345678",
    id_tienda: 1,
    id_producto: 3,
    nombre: "Producto Z",
    descripcion: "Desc. Producto",
    marca: "Marca ABC",
    costo: 3000,
    condicion: Condicion.USADO,
    stock: 30,
    categoria: Categoria.LIBROS,
    activo: true,
    fecha: new Date(),
    peso: 10,
    alto: 15,
    largo: 20,
    ancho: 25,
    foto_referencia: pic1
  },
];

export const handlers = [...storeHandlers, ...productsHandlers];
