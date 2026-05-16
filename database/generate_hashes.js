#!/bin/bash

# Script para generar hashes bcrypt de las contraseñas
# Ejecutar: node generate_hashes.js

const bcrypt = require('bcryptjs');

const passwords = {
  'admin@babilin.es': 'admin123',
  'padre@babilin.es': 'padre123'
};

console.log('Generando hashes bcrypt...\n');

Object.entries(passwords).forEach(([email, password]) => {
  const hash = bcrypt.hashSync(password, 10);
  console.log(`${email}: ${hash}`);
});
