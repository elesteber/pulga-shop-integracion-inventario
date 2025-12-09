Pulga Shop - Docker Compose Local (Frontend + Backend + Postgres + Redis + pgAdmin)

Instrucciones breves para ejecutar la pila integrada localmente en Windows PowerShell.

Archivos creados:
- `docker-compose.yml` — archivo compose con frontend, backend, postgres, redis, pgadmin
- `Dockerfile` — build multi-etapa del frontend (sirve archivos estáticos en el puerto 3000)
- `.dockerignore`

## Configuración de la red Docker compartida

Este proyecto usa una red Docker externa llamada `pulga-integration-net` que permite la comunicación entre el frontend y el backend, ejecutándose cada uno en su propio repositorio con su propio `docker-compose.yml`.

**Paso 0: Crear la red compartida (solo una vez)**

Antes de levantar cualquier servicio, crea la red Docker externa:

PowerShell:
```
docker network create pulga-integration-net
```

**Nota:** Esta red solo necesita crearse una vez. Los contenedores del frontend y backend se unirán automáticamente a esta red cuando ejecutes sus respectivos `docker-compose up`.

**Verificar la red:**
```
docker network ls | findstr pulga-integration-net
```

## Ejecución de los servicios

**Importante:** El frontend y el backend deben ejecutarse desde sus repositorios separados. Cada uno tiene su propio `docker-compose.yml` que se conecta a la red compartida `pulga-integration-net`.

**Orden de ejecución recomendado:**

1) **Levantar el backend primero** (desde el repositorio del backend):
```
cd C:\ruta\a\repo-backend
docker compose up -d --build
```

2) **Levantar el frontend** (desde este repositorio):

PowerShell:
```
# Desde la raíz del proyecto frontend
docker compose up -d --build
```

3) **Verificar que ambos stacks están en la misma red:**
```
docker network inspect pulga-integration-net --format '{{json .Containers}}' | Out-String
```

Deberías ver contenedores del frontend y del backend listados.

**Comprobaciones rápidas esperadas después del inicio:**
- Interfaz del Frontend: http://localhost:16004/  (mapeado al puerto 3000 del contenedor)
- API del Backend: http://localhost:16014/api  (depende del backend; si se construye desde código debe exponer /api)
- Postgres: 5432 dentro del contenedor, mapeado al host en el puerto 16010
- Redis: localhost:6379
- pgAdmin: http://localhost:8080 (usuario: admin@local / contraseña: admin)

## Comandos útiles

**Ver logs del frontend:**
```
docker compose logs -f frontend
```

**Detener los servicios:**
```
# Desde el repositorio del frontend
docker compose down

# Desde el repositorio del backend
cd C:\ruta\a\repo-backend
docker compose down
```

**Reiniciar ambos stacks (limpio):**
```
# 1. Detener todo
docker compose down
cd C:\ruta\a\repo-backend
docker compose down

# 2. (Opcional) Recrear la red si hay problemas
docker network rm pulga-integration-net
docker network create pulga-integration-net

# 3. Levantar backend y luego frontend
cd C:\ruta\a\repo-backend
docker compose up -d --build

cd C:\ruta\a\repo-frontend
docker compose up -d --build
```

## Generación de token JWT de prueba (ejemplo)

Ejemplo de PowerShell para crear un token ejecutando node dentro del contenedor del backend (requiere que `jsonwebtoken` esté disponible en la imagen del backend):

```
# Capturar el token en una variable de PowerShell (nota: usar -T para evitar problemas de tty en Windows)
$token = docker compose exec -T backend node -e "console.log(require('jsonwebtoken').sign({id:1,email:'test@example.com'}, process.env.JWT_SECRET || 'EstoEsUnSecretoSuperSeguro',{expiresIn:'7d'}))"

# Usar el token para llamar a un endpoint protegido
Invoke-RestMethod -Uri "http://localhost:16014/api/protected" -Headers @{ Authorization = "Bearer $token" }
```

Notas y solución de problemas:
- Si tienes el código fuente del backend y deseas construirlo localmente, crea `./Plan-integracion/backend` y coloca el código del backend allí, luego descomenta la sección `build` bajo el servicio `backend` en `docker-compose.yml`.
- Si tienes un dump SQL en `./Plan-integracion/db_dump.sql`, descomenta la línea de volumen comentada en el servicio `postgres` para importarlo automáticamente en el primer inicio.
- Se proporcionan healthchecks; usa `docker compose ps` para ver el estado de los servicios.
- El JWT_SECRET por defecto es `EstoEsUnSecretoSuperSeguro` (solo para desarrollo). Cámbialo para producción.

Soluciones comunes:
- Si `prisma generate` falla en los builds del backend, asegúrate de que el `Dockerfile` del backend copie la carpeta `prisma` antes de ejecutar `npx prisma generate` (consulta la plantilla `Plan-integracion/backend/Dockerfile` si la usas).
- Si obtienes conflictos con contenedores existentes, elimínalos (por ejemplo: `docker rm -f pulga-redis`) o evita establecer `container_name` en el compose.
