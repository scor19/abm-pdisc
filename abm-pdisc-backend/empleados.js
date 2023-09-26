import express from "express";
import middleware from "./middleware/middleware.js";
import db from "./db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const q = "SELECT * FROM empleados";
  db.query(q, (err, data) => {
    if (err) return console.log(res.json(err));
    return res.json(data);
  });
});

router.get("/:id", (req, res) => {
  const empleadosId = req.params.id;
  const q = "SELECT * FROM empleados WHERE id = ?";
  db.query(q, [empleadosId], (err, data) => {
    if (err) return console.log(res.json(err));
    return res.json(data);
  });
});

router.post("/", middleware(), (req, res) => {
  const q =
    "INSERT INTO empleados (`nombre`, `apellido`, `direccion`, `sueldo`) VALUES (?)";
  const values = [
    req.body.nombre,
    req.body.apellido,
    req.body.direccion,
    req.body.sueldo,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.delete("/:id", (req, res) => {
  const empleadosId = req.params.id;
  const q = "DELETE FROM empleados WHERE id = ?";

  db.query(q, [empleadosId], (err, data) => {
    if (err) return res.json(err);
    return res.json("El empleado se eliminó correctamente");
  });
});

router.put("/:id", middleware(), (req, res) => {
  const empleadosId = req.params.id;
  const q =
    "UPDATE empleados SET `nombre` = ?, `apellido` = ?, `direccion` = ?, `sueldo` = ? WHERE id = ?";
  const values = [
    req.body.nombre,
    req.body.apellido,
    req.body.direccion,
    req.body.sueldo,
  ];

  db.query(q, [...values, empleadosId], (err, data) => {
    if (err) return res.json(err);
    return res.json("El empleado se editó correctamente");
  });
});

export default router;