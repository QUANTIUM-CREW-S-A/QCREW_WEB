# QCREW_WEB

Sitio de Quantium Crew: React 18 + TypeScript + Vite + Tailwind, con **Supabase**
para datos, autenticación y almacenamiento.

## 🐳 Ejecución (SOLO DOCKER)

**⚠️ Este proyecto SOLO se ejecuta en Docker. No se puede ejecutar localmente.**

### Requisitos
- Docker
- Docker Compose

### Inicio Rápido

```bash
# Con el script helper
./docker.sh start

# O con docker-compose directo
docker-compose up
```

Accede en `http://localhost:5173`

### Comandos Útiles

```bash
./docker.sh start      # Inicia el contenedor
./docker.sh stop       # Detiene
./docker.sh rebuild    # Reconstruye (después de cambios de código)
./docker.sh logs       # Ver logs en vivo
./docker.sh clean      # Elimina contenedores e imagen
./docker.sh status     # Estado del contenedor
```

### Configuración

1. Copia `.env.example` a `.env` y completa los valores
2. Reconstruye: `./docker.sh rebuild`

## Base de datos

El esquema vive en `supabase/migrations/`. El estado final de las policies de
RLS está en `20260813031228_consolidate_permissive_policies.sql`.

| Tabla | Para qué |
|---|---|
| `testimonials` | testimonios enviados desde la web, con flujo de aprobación |
| `conversations` | conversaciones del chat de clientes |
| `messages` | mensajes de cada conversación |

Bucket de Storage: `testimonials` (público, 5MB, solo imágenes).

### Modelo de permisos

- **Público (`anon`)**: lee testimonios aprobados, envía testimonios nuevos
  (siempre entran como `pending` — lo fuerza RLS, no el frontend) y sube
  imágenes al bucket.
- **Cliente del chat**: usa una **sesión anónima** de Supabase. Solo ve y
  escribe en su propia conversación, y solo con `sender='client'`.
- **Admin**: es el usuario cuyo JWT trae `app_metadata.role = 'admin'`. Se usa
  `app_metadata` y no `user_metadata` porque este último **sí lo puede editar
  el propio usuario**, que podría auto-promoverse.

El mensaje de bienvenida del chat lo inserta un trigger `SECURITY DEFINER`,
porque RLS impide al navegador escribir mensajes como `admin`.

## Configuración requerida en el dashboard

Dos ajustes que no se pueden aplicar por migración:

1. **Authentication → Sign In / Providers → Anonymous sign-ins: ON.**
   Sin esto el chat de clientes no arranca.
2. **Crear el usuario admin** en Authentication → Users, y luego asignarle el rol:

   ```sql
   update auth.users
      set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
                              || '{"role":"admin"}'::jsonb
    where email = 'TU_EMAIL_AQUI';
   ```

   El claim entra en el JWT al siguiente login.

## Tipos de TypeScript

`src/types/database.ts` se mantiene a mano a propósito: las columnas `status`,
`priority` y `sender` son `text` con `CHECK`, así que los tipos generados las
dan como `string`. Aquí están estrechadas a uniones literales. Si cambias el
esquema, contrasta con:

```bash
supabase gen types typescript --project-id <project-ref>
```
