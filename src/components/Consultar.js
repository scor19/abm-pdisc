import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Consultar() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchAllEmpleados = async () => {
      try {
        const res = await axios.get("http://localhost:8800/empleados");
        setEmpleados(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEmpleados();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/empleados/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-6 mb-2">
        <p>Nombre</p>
        <p>Apellido</p>
        <p>Direccion</p>
        <p>Sueldo</p>
      </div>
      <div className="">
        {empleados.map((empleado) => (
          <div
            className="grid grid-cols-6 outline outline-1 outline-gray-200 rounded m-1 p-1"
            key={empleado.id}
          >
            <p>{empleado.nombre}</p>
            <p>{empleado.apellido}</p>
            <p>{empleado.direccion}</p>
            <p>{empleado.sueldo}</p>
            <button
              className="bg-red-200 outline outline-red-500 outline-2 rounded mx-1"
              onClick={() => handleDelete(empleado.id)}
            >
              Eliminar
            </button>
            <button className="bg-blue-200 outline outline-blue-500 outline-2 rounded mx-1">
              <Link to={`/editar/${empleado.id}`}>Editar</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Consultar;
