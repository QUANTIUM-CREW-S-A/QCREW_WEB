# 🔧 Guía de Configuración - Variables de Entorno

El proyecto necesita **variables de Supabase** para funcionar. Estos son los pasos:

## 1️⃣ Obtener credenciales de Supabase

1. Accede a [https://app.supabase.com/](https://app.supabase.com/)
2. Selecciona tu proyecto
3. Ve a **Project Settings → API**
4. Copia estos valores:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_PUBLISHABLE_KEY` (⚠️ usa la key `sb_publishable_...`)

## 2️⃣ Configurar archivo `.env`

En la raíz del proyecto, edita `.env`:

```bash
VITE_SUPABASE_URL=https://xyz-abc.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_TURNSTILE_SITE_KEY=tu_turnstile_key_aqui
```

⚠️ **IMPORTANTE:** Este archivo está en `.gitignore` por seguridad. No lo subas a Git.

## 3️⃣ Ejecutar con Docker

Una vez completado el `.env`:

```bash
./docker.sh rebuild
```

o

```bash
docker-compose up --build
```

## ✅ Verificación

Si todo funciona, deberías ver:
- La página carga correctamente
- No hay errores en la consola del navegador
- Puedes acceder a `http://localhost:5173`

---

## 🐛 Problemas Comunes

| Problema | Solución |
|----------|----------|
| Pantalla en blanco | Verifica que `.env` tenga valores reales (no placeholders) |
| Error "VITE_SUPABASE_URL not found" | Comprueba que `.env` está en la raíz del proyecto |
| Errores de autenticación | Usa la key **anon public** no la secret key |

