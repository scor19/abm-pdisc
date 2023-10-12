import express from "express";
import db from "./db.js";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const router = express.Router();

// const TOKEN_KEY = "123";

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers["autorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   console.log(authHeader);
//   if (token == null) return res.status(401).send("Token requerido");
//   jwt.verify(token, TOKEN_KEY, (err, user) => {
//     if (err) return res.status(403).send("Token invalido");
//     req.user = user;
//     next();
//   });
// };

function generateAccessToken(user) {
  console.log(process.env.SECRET);
  console.log(user);
  return jwt.sign(user, process.env.SECRET, { expiresIn: "5m" });
}

router.post("/login", async (req, res) => {
  const nombre = req.body.nombre;
  const email = req.body.email;
  const contraseña = req.body.contraseña;
  console.log(nombre, email, contraseña);

  if (nombre && email && contraseña) {
    const q =
      "SELECT * FROM empleados_login WHERE nombre = ? AND mail = ? AND contraseña = ?";
    const values = [nombre, email, contraseña];
    db.query(q, values, (err, data) => {
      console.log(err);
      if (err) return res.json("El usuario no existe");
      const user = JSON.parse(JSON.stringify(data[0]));

      const accessToken = generateAccessToken(user);

      res.header("authorization", accessToken).json({
        message: "Usuario autenticado",
        token: accessToken,
      });
      return res.status(200);
    });
  }
});

router.post("/register", (req, res) => {
  console.log("asd");
  const values = [req.body.mail, req.body.nombre];
  const qr = "SELECT * FROM empleados_login WHERE nombre = ? AND mail = ?";
  db.query(qr, values, (err, data) => {
    const user = JSON.parse(JSON.stringify(data[0]));
    console.log("User:", user, "Values:", values);
    if (user.nombre === values[0] ?? user.mail === values[1]) {
      return res.json("El usuario ya existe");
    } else {
      const q =
        "INSERT INTO empleados_login (`mail`, `nombre`, `contraseña`) VALUES (?)";
      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
      });
    }
  });
});

export default router;
