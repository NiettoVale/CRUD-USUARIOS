// Importaciones necesarias:
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const routes = require("./routes/index");

// Middlewares:
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Rutas:
app.use("/", routes);

// Exportación del servidor:
module.exports = app;
