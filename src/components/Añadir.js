import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Añadir() {
  const [empleado, setEmpleado] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    sueldo: "",
  });

  const handleChange = (e) => {
    setEmpleado((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/empleados", empleado);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(empleado);

  return (
    <div className="flex flex-col items-center justify-center">
      <label>Nombre del empleado: </label>
      <input
        type="text"
        name="nombre"
        className="w-72 h-14 m-2.5 shadow-inner rounded outline outline-1 outline-gray-200 p-4"
        onChange={handleChange}
      />
      <label>Apellido: </label>
      <input
        type="text"
        name="apellido"
        className="w-72 h-14 m-2.5 shadow-inner rounded outline outline-1 outline-gray-200 p-4"
        onChange={handleChange}
      />
      <label>Direccion: </label>
      <input
        type="text"
        name="direccion"
        className="w-72 h-14 m-2.5 shadow-inner rounded outline outline-1 outline-gray-200 p-4"
        onChange={handleChange}
      />
      <label>Sueldo: </label>
      <input
        type="number"
        name="sueldo"
        className="w-72 h-14 m-2.5 shadow-inner rounded outline outline-1 outline-gray-200 p-4"
        onChange={handleChange}
      />
      <button
        className="bg-green-300 rounded-lg p-2 mb-1.5 px-5 active:bg-green-500"
        onClick={handleClick}
      >
        Añadir
      </button>
    </div>
  );
}

export default Añadir;
