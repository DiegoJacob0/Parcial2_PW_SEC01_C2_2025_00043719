const express = require('express');
const app = express();
const PORT = 3130;

app.use(express.json());
const cuentasRoutes = require('./routes/rutas');
app.use('/', cuentasRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

