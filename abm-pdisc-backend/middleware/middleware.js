import express from "express";
import * as yup from "yup";

const app = express();

function middleware() {
  const userSchema = yup.object().shape({
    nombre: yup
      .string()
      .typeError("Por favor, introduzca su nombre")
      .max(20, "No puede tener mas de 10 caracteres")
      .min(2, "No puede tener menos de 2 caracteres")
      .matches(/^[A-Za-z0-9]+$/i)
      .required("No puede estar vacio"),
    apellido: yup
      .string()
      .typeError("Por favor, introduzca su apellido")
      .max(20, "No puede tener mas de 10 caracteres")
      .min(2, "No puede tener menos de 2 caracteres")
      .matches(/^[A-Za-z0-9]+$/i)
      .required("No puede estar vacio"),
    direccion: yup
      .string()
      .min(3, "No puede tener menos de 3 caracteres")
      .max(12, "No puede tener mas de 12 caracteres")
      .required("No puede estar vacio"),
    sueldo: yup
      .number()
      .typeError("El sueldo debe ser un numero")
      .min(0, "No puede ser un numero negativo")
      .required("No puede estar vacio"),
  });

  const validateBody = async (req, res, next) => {
    try {
      // Valida el cuerpo de la petición con el esquema
      await userSchema.validate(req.body);
      // Si todo está bien, pasa al siguiente middleware
      next();
    } catch (error) {
      // Si hay algún error, envia una respuesta con el mensaje del error
      res.status(400).json({ message: error.message });
    }
  };
  return validateBody;
}

export default middleware;
