# Guía de Integración - Pulga Shop

## 📋 Requisitos Previos

- Docker Desktop instalado y ejecutándose
- Git para clonar repositorios
- Puertos disponibles: 80, 8080, 16010, 6379

## 🚀 Pasos para Integración

### 1. Crear Carpeta de Integración

```powershell
# Crear directorio fuera de los repositorios
mkdir C:\pulga-shop-integration
cd C:\pulga-shop-integration
```

### 2. Clonar Repositorios

```powershell
# Clonar backend
git clone https://github.com/Catrilao/pulga-shop-inventario-backend.git

# Clonar frontend (ajustar URL según corresponda)
git clone https://github.com/TU-ORG/pulga-shop-inventario-frontend.git
```

### 3. Copiar Archivos de Configuración

```powershell
# Copiar docker-compose y nginx.conf desde el backend
Copy-Item .\pulga-shop-inventario-backend\docker-compose.integration.yml .\docker-compose.yml
Copy-Item .\pulga-shop-inventario-backend\nginx.conf .\nginx.conf
```

**Estructura resultante:**
```
C:\pulga-shop-integration\
├── pulga-shop-inventario-backend/
│   ├── Dockerfile
│   ├── dump.sql
│   └── src/...
├── pulga-shop-inventario-frontend/
│   ├── Dockerfile
│   └── src/...
├── docker-compose.yml          ← Copiado y renombrado
└── nginx.conf                  ← Copiado
```

### 4. Levantar la Aplicación

```powershell
# Desde C:\pulga-shop-integration\
docker compose up -d --build
```

**Nota:** La primera vez puede demorar 30-60 minutos debido a la descarga de imágenes y compilación.

### 5. Verificar Servicios

```powershell
# Ver estado de contenedores
docker compose ps

# Ver logs en tiempo real
docker compose logs -f

# Ver logs específicos
docker compose logs backend
docker compose logs frontend
docker compose logs nginx
```

### 6. Probar Endpoints

```powershell
# Frontend (a través de NGINX)
curl http://localhost

# API Backend (a través de NGINX)
curl http://localhost/api

# Swagger Docs (a través de NGINX)
curl http://localhost/docs

# pgAdmin (directo)
# Abrir en navegador: http://localhost:8080
# Email: pgadmin@local
# Password: pgadmin
```

## 🔍 Puertos Expuestos

| Servicio | Puerto | URL | Descripción |
|----------|--------|-----|-------------|
| NGINX | 80 | http://localhost | Punto de entrada principal |
| NGINX Alt | 16004 | http://localhost:16004 | Puerto alternativo |
| Postgres | 16010 | localhost:16010 | Base de datos (directo) |
| Redis | 6379 | localhost:6379 | Cache (directo) |
| pgAdmin | 8080 | http://localhost:8080 | Administrador de BD |

## 🧪 Datos de Prueba

### Token JWT de Prueba

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJWRU5EXzAwMSIsImVtYWlsIjoiY29ycmVvQGNvcnJlby5jb20iLCJyb2xlIjoidmVuZGVkb3IiLCJpYXQiOjE3NjQ2NTQyOTl9.RrcsmZ5QbRTGBUICc50culf6khoo70P2EG81wAm0eI8
```

**Usuario:** VEND_001 (vendedor)  
**Tiendas:** TecnoCentral Santiago (id: 1), TecnoCentral Valpo (id: 2)

### Ejemplos de Peticiones

```powershell
# Listar productos (público)
curl http://localhost/api/productos

# Obtener producto por SKU (público)
curl http://localhost/api/productos/NB-ASUS-001

# Crear producto (requiere autenticación)
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
$headers = @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" }
$body = @{
    id_tienda = 1
    nombre = "Mouse Logitech"
    stock = 10
    costo = 25000
    categoria = "ELECTRÓNICA"
    condicion = "NUEVO"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost/api/productos" -Method POST -Headers $headers -Body $body
```

## 🐛 Troubleshooting

### Error: "Puerto ya en uso"

```powershell
# Verificar qué proceso usa el puerto 80
netstat -ano | findstr :80

# Detener otros servicios o cambiar puerto en docker-compose.yml
ports:
  - "8000:80"  # Cambiar 80 por otro puerto
```

### Error: "Cannot connect to Docker daemon"

1. Abrir Docker Desktop
2. Esperar a que inicie completamente
3. Verificar en la bandeja del sistema (tray)

### Error: "Service 'backend' failed to build"

```powershell
# Ver logs detallados
docker compose build backend --no-cache --progress=plain

# Limpiar cache de Docker
docker system prune -a --volumes
```

### Base de datos no inicializa

```powershell
# Eliminar volumen y recrear
docker compose down -v
docker compose up -d --build
```

### Errores de NGINX 502 Bad Gateway

```powershell
# Verificar que backend/frontend estén corriendo
docker compose ps

# Revisar logs de NGINX
docker compose logs nginx

# Verificar healthcheck
docker compose exec backend wget -O- http://localhost:3000/api
docker compose exec frontend wget -O- http://localhost:3000/
```

## 🛑 Detener y Limpiar

```powershell
# Detener servicios
docker compose down

# Detener y eliminar volúmenes (borra datos de BD)
docker compose down -v

# Limpiar todo (imágenes, contenedores, volúmenes)
docker compose down -v --rmi all
```

## 📝 Notas Importantes

1. **Base de datos:** El archivo `dump.sql` se ejecuta automáticamente al crear el contenedor de Postgres.
2. **CORS:** El backend está configurado para aceptar peticiones desde `http://localhost` (NGINX).
3. **Logs:** Mantén la terminal abierta para ver logs en tiempo real durante pruebas.
4. **Healthchecks:** Todos los servicios tienen healthchecks configurados; usa `docker compose ps` para ver el estado.
5. **Producción:** Cambiar `JWT_SECRET` y credenciales de base de datos antes de producción.

## 🔗 Enlaces Útiles

- **API Docs:** http://localhost/docs
- **Frontend:** http://localhost
- **pgAdmin:** http://localhost:8080

## 📞 Soporte

Si tienes problemas con la integración:
1. Revisa los logs: `docker compose logs -f`
2. Verifica la estructura de carpetas (sección 3)
3. Consulta la sección de Troubleshooting
4. Abre un issue en el repositorio de GitHub
