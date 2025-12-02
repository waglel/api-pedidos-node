const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Conectar ao MongoDB ANTES de registrar as rotas ---
connectDB().then(() => {
  console.log("MongoDB conectado, rotas liberadas!");
});

// --- Rotas ---
app.use("/", orderRoutes);

module.exports = app;
