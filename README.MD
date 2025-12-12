### Se que oyes mis pensamientos Nico

- Para ejecutar la integracion abre primero el docker y despues pone en el CMD:

```bash
docker compose down -v && docker compose up -d --build
```

# Configuración de Entornos

| Variable         | Servicio | Descripción                                                                                                                   |
| ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `VITE_SKIP_AUTH` | Frontend | Si es `true`, carga automáticamente un token de prueba y omite la pantalla de login.                                          |
| `NODE_ENV`       | Backend  | Si es `development`, todos los usuarios tienen permisos de administrador sin verificar con el microservicio de autenticación. |

## Ubicación de variables en `docker-compose.yml`:

### Frontend:

```yml
frontend:
  build:
    context: ./pulga-shop-inventario-frontend
    dockerfile: Dockerfile
    args:
      - VITE_API_URL=http://localhost:16014/api
      - VITE_SKIP_AUTH=true # <---------- Variable de configuración para el inicio de sesión
  image: pulga-frontend:integration
```

### Backend:

```yml
backend:
  build:
    context: ./pulga-shop-inventario-backend
    dockerfile: Dockerfile
  image: pulga-backend:integration
  ports:
    - "16014:3000"
  environment:
    - PORT=3000
    - NODE_ENV=development # <---------- Variable de configuración para los permisos de usuario
    - DATABASE_URL=postgresql://postgres:postgres@db_postgres:5432/pulga_shop?schema=public
```

# Puertos del microservicio

| Servicio    | Puerto | Descripción                 |
| ----------- | ------ | --------------------------- |
| Nginx       | 16004  | Punto de entrada (Frontend) |
| Backend API | 16014  | API                         |
| PostgreSQL  | 5432   | Base de datos               |
| Redis       | 6379   | Caché                       |
