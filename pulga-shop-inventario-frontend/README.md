# Inventario Frontend - Pulga Shop

Cliente desarrollado en React para el inventario de Pulga Shop.

## Instalación

1. Clona este repositorio:

```bash
git clone <url-del-repositorio>
cd <dir-name>
```

2. Instala las dependencias con pnpm:

```bash
pnpm install
```

3. .env

```bash
VITE_API_URL=http://localhost:3000/api
```

## Ejecución

- **Desarrollo**:

```bash
pnpm dev
```

Esto iniciará el servidor de desarrollo en `http://localhost:5173`. Se usa Mock Service Worker si Vite se encuentra en modo desarrollo.

```ts
// src/main.tsx

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("./mocks/browser.ts");
  return worker.start();
}
```

- **Construcción para producción**:

```bash
pnpm build
```

- **Vista previa de la versión de producción**:

```bash
pnpm preview
```

- **Ejecutar el linter**:

```bash
pnpm lint
```
