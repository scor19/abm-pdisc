import express from "express";
import cors from "cors";
import empleadosRouter from "./empleados.js";

const app = express();

app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("esto es el backend");
});

app.use("/empleados", empleadosRouter);

app.use((err, req, res, next) => {
  // Errores globales
  res.status(500).json({ message: err.message });
});

app.listen(8800, () => {
  console.log("Conectado al backend!");
});
