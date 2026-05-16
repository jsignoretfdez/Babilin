# Babilín - Escuela Infantil Bilingüe

Aplicación web full-stack para la gestión de la escuela infantil Babilín.

## Stack Tecnológico

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Base de Datos:** PostgreSQL
- **Package Manager:** pnpm
- **Autenticación:** JWT (JSON Web Tokens)

## Estructura del Proyecto

```
Babilin/
├── client/          # Frontend React
├── server/          # Backend Express
├── database/        # Scripts SQL
├── package.json     # Dependencias raíz
└── setup.sh         # Script de configuración
```

## Requisitos Previos

- Node.js (v18 o superior)
- pnpm (v8 o superior)
- PostgreSQL (v14 o superior)

## Configuración

### 1. Instalar pnpm (si no está instalado)

```bash
npm install -g pnpm
```

### 2. Instalar dependencias

```bash
chmod +x setup.sh
./setup.sh
```

O manualmente:

```bash
pnpm install
cd server && pnpm install && cd ..
cd client && pnpm install && cd ..
```

### 3. Configurar PostgreSQL

Crear la base de datos y ejecutar el script de inicialización:

```bash
# Crear la base de datos
psql -U postgres -c "CREATE DATABASE babilin_db;"

# Ejecutar el script de inicialización
psql -U postgres -d babilin_db -f database/init.sql
```

### 4. Configurar variables de entorno

Editar `server/.env` con tus credenciales de PostgreSQL:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=babilin_db
DB_USER=postgres
DB_PASSWORD=tu_password
JWT_SECRET=tu_secreto_jwt
```

### 5. Iniciar la aplicación

```bash
pnpm dev
```

Esto iniciará simultáneamente:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

## Usuarios de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Administrador | admin@babilin.es | admin123 |
| Padre | padre@babilin.es | padre123 |

## Páginas

- **/** - Página principal (Inicio)
- **/galeria** - Galería de instalaciones
- **/login** - Acceso de usuarios
- **/padres** - Portal de padres (requiere login)
- **/admin** - Panel de administración (requiere login como admin)

## API Endpoints

| Método | Ruta | Descripción | Autenticación |
|--------|------|-------------|---------------|
| POST | /api/auth/login | Iniciar sesión | No |
| GET | /api/auth/me | Obtener usuario actual | JWT |
| GET | /api/auth/users | Listar usuarios | JWT + Admin |
| GET | /api/health | Estado del servidor | No |

## Características

- Diseño responsivo (mobile-first)
- Tema "Sky Blue Serenity" con Tailwind CSS
- Fuente Quicksand de Google Fonts
- Iconos Material Symbols Outlined
- Autenticación JWT con roles (admin/parent)
- Rutas protegidas según rol
- Layout reutilizable (Header/Footer)
# Babilin
