const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const programmingRoutes = require('./routes/programmingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/programmings', programmingRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Babilín API funcionando' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
