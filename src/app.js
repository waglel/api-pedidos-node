const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/", orderRoutes);

module.exports = app;