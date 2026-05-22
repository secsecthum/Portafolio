require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Servir frontend (Asegúrate de que la carpeta public esté un nivel arriba de src)
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.use('/api/scan', require('./routes/scan.routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
  🛡️  SHIELD_SOC Engine Active
  🌐 URL: http://localhost:${PORT}
  ---------------------------------`);
});