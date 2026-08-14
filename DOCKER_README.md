# QCREW Web - Docker Only

Este proyecto **solo se ejecuta en Docker**. No está diseñado para ejecución local.

## 🐳 Requisitos

- Docker
- Docker Compose

## 🚀 Inicio Rápido

### Opción 1: Docker Compose (Recomendado)

```bash
docker-compose up
```

El proyecto estará disponible en `http://localhost:5173`

### Opción 2: Docker directo

```bash
# Construir la imagen
docker build -t qcrew-web .

# Ejecutar el contenedor
docker run -p 5173:5173 qcrew-web
```

## 📁 Estructura

- `Dockerfile` - Configuración de Docker (build multi-stage)
- `docker-compose.yml` - Orquestación de contenedores
- `.dockerignore` - Archivos excluidos del build

## 🔄 Ciclo de Desarrollo

1. Realiza cambios en el código
2. Reconstruye la imagen: `docker-compose up --build`
3. Los cambios se reflejan automáticamente

## 🛑 Detener el Contenedor

```bash
docker-compose down
```

## 📝 Notas

- Los scripts `dev`, `lint` y `preview` han sido eliminados
- Solo están disponibles: `build` y `check`
- El proyecto se compila dentro del contenedor
- La aplicación se sirve con `serve` en modo producción

## 🌍 Variables de Entorno

Si necesitas variables de entorno, añade un archivo `.env` y actualiza `docker-compose.yml`:

```yaml
environment:
  - VARIABLE=valor
```

---

**⚠️ Este proyecto solo funciona en Docker. No se puede ejecutar localmente con npm.**
