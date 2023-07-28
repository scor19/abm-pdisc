import React, { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div className="">
      <div className="grid grid-cols-5 mb-2">
        <p>Nombre</p>
        <p>Apellido</p>
        <p>Direccion</p>
        <p>Sueldo</p>
        <p>Eliminar</p>
      </div>
      <div className="">
        {empleados.map((empleado) => (
          <div
            className="grid grid-cols-5 outline outline-1 outline-gray-200 rounded m-1"
            key={empleado.id}
          >
            <p>{empleado.nombre}</p>
            <p>{empleado.apellido}</p>
            <p>{empleado.direccion}</p>
            <p>{empleado.sueldo}</p>
            <button className="bg-red-500">X</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Consultar;
