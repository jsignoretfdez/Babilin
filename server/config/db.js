const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// If DB_HOST is localhost and password is empty, use socket connection
const useSocket = !process.env.DB_HOST || process.env.DB_HOST === '/var/run/postgresql' || (!process.env.DB_PASSWORD && process.env.DB_HOST === 'localhost');

const pool = new Pool({
  host: useSocket ? '/var/run/postgresql' : process.env.DB_HOST,
  port: useSocket ? undefined : (process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || undefined,
});

pool.on('connect', () => {
  console.log('Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Error en la conexión a PostgreSQL:', err);
});

module.exports = pool;
