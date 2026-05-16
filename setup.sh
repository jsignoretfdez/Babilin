#!/bin/bash

# Script de configuración del proyecto Babilín con pnpm
echo "=== Configuración del Proyecto Babilín ==="

# Verificar pnpm
if ! command -v pnpm &> /dev/null; then
    echo "Error: pnpm no está instalado"
    echo "Instalar con: npm install -g pnpm"
    exit 1
fi

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "Error: Node.js no está instalado"
    exit 1
fi

echo "1. Instalando dependencias del proyecto raíz..."
pnpm install

echo "2. Instalando dependencias del servidor..."
cd server && pnpm install && cd ..

echo "3. Instalando dependencias del cliente..."
cd client && pnpm install && cd ..

echo ""
echo "=== Dependencias instaladas correctamente ==="
echo ""
echo "Para iniciar el proyecto:"
echo "  pnpm dev"
echo ""
echo "O por separado:"
echo "  Backend:  cd server && pnpm dev"
echo "  Frontend: cd client && pnpm dev"
echo ""
echo "Usuarios de prueba:"
echo "  Admin: admin@babilin.es / admin123"
echo "  Padre: padre@babilin.es / padre123"
echo ""
echo "URLs:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
