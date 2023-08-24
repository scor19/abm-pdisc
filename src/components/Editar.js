import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Editar() {
  const [empleados, setEmpleados] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    sueldo: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const empleadoId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchAllEmpleados = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/empleados/" + empleadoId
        );
        setEmpleados({ ...res.data[0] });
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEmpleados();
  }, [empleadoId]);

  console.log(empleados);

  const handleChange = (e) => {
    setEmpleados((prev) => ({ ...prev, [e.target.name]: e.target.value })); 
  };

  // Función para verificar si el usuario cambió algún valor o no
  const verificarCambio = (campo) => {
    if (empleados[campo] === "") {
      // Si el usuario dejó el campo vacío, se envía el valor original
      return empleados[campo];
    } else {
      // Si el usuario ingresó un valor nuevo, se envía ese valor
      return empleados[campo];
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:8800/empleados/" + empleadoId,
        {
          nombre: verificarCambio("nombre"),
          apellido: verificarCambio("apellido"),
          direccion: verificarCambio("direccion"),
          sueldo: verificarCambio("sueldo"),
        } // Se usa la función verificarCambio para enviar los datos correctos
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container max-w-xs mx-auto rounded outline outline-1 outline-gray-300 shadow-lg m-5 py-1">
      <div className="flex flex-col items-center justify-center">
        <label>Nombre del empleado: </label>
        <input
          type="text"
          name="nombre"
          className="w-72 h-14 m-2.5 shadow-inner rounded outline outline-1 outline-gray-200 p-4"
          onChange={handleChange}
          placeholder={empleados.nombre}
        />
        <label>Apellido: </label>
        <input
          type="text"
          name="apellido"
          className="w-72 h-14 m-2.5 shadow-inner rounded outline outline-1 outline-gray-200 p-4"
          onChange={handleChange}
          placeholder={empleados.apellido}
        />
        <label>Direccion: </label>
        <input
          type="text"
          name="direccion"
          className="w-72 h-14 m-2.5 shadow-inner rounded outline outline-1 outline-gray-200 p-4"
          onChange={handleChange}
          placeholder={empleados.direccion}
        />
        <label>Sueldo: </label>
        <input
          type="number"
          name="sueldo"
          className="w-72 h-14 m-2.5 shadow-inner rounded outline outline-1 outline-gray-200 p-4"
          onChange={handleChange}
          placeholder={empleados.sueldo}
        />
        <button
          className="bg-green-300 rounded-lg p-2 mb-1.5 px-5 active:bg-green-500"
          onClick={handleClick}
        >
          Editar
        </button>
      </div>
    </div>
  );
}

export default Editar;
