-- Script de inicialización para PostgreSQL
-- Ejecutar: psql -U postgres -f init.sql

-- Crear la base de datos (ejecutar primero)
-- CREATE DATABASE babilin_db;

-- Conectar a la base de datos
-- \c babilin_db;

-- Crear tipo enum para roles
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'parent');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role user_role NOT NULL DEFAULT 'parent',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Limpiar usuarios existentes (opcional)
-- DELETE FROM users;

-- Insertar usuarios de prueba
-- Las contraseñas están hasheadas con bcrypt
-- admin123: $2a$10$1aoBHmZ8V4vNh9opelqcTOH/kiaJIbP/zUaiXpTWm61x/VX2U8SWG
-- padre123: $2a$10$3iFNbqqxWe3WC36ErsSm0.MQ6Bek7.di6PUhGxQAanfwexLeJDFeC

INSERT INTO users (email, password, name, role) VALUES
('admin@babilin.es', '$2a$10$1aoBHmZ8V4vNh9opelqcTOH/kiaJIbP/zUaiXpTWm61x/VX2U8SWG', 'Administrador', 'admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (email, password, name, role) VALUES
('padre@babilin.es', '$2a$10$3iFNbqqxWe3WC36ErsSm0.MQ6Bek7.di6PUhGxQAanfwexLeJDFeC', 'Usuario Padre', 'parent')
ON CONFLICT (email) DO NOTHING;

-- Verificar inserción
SELECT id, email, name, role, created_at FROM users;
