import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "./Container";

function Login() {
  const [empleado, setEmpleado] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmpleado((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://localhost:8800/auth/login",
        empleado
      );
      console.log(data)
      if (data.data.token) setIsLogged(true);
    } catch (err) {
      console.log(err);
    }
  };

  return isLogged ? (
    <Container />
  ) : (
    <div>
      <div className="container max-w-xs mx-auto rounded outline outline-1 outline-gray-300 shadow-lg m-5 py-1">
        <div className="flex flex-col items-center justify-center">
          <h1 className="flex items-center justify-center font-3xl font-bold text-lg my-3">
            Iniciar sesión
          </h1>
          <div className="flex flex-col items-center justify-center">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              className="w-72 h-14 m-2.5 shadow-inner rounded outline outline-1 outline-gray-200 p-4"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <label>Mail:</label>
            <input
              type="text"
              name="email"
              className="w-72 h-14 m-2.5 shadow-inner rounded outline outline-1 outline-gray-200 p-4"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <label>Contraseña:</label>
            <input
              type="text"
              name="contraseña"
              className="w-72 h-14 m-2.5 shadow-inner rounded outline outline-1 outline-gray-200 p-4"
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-green-300 rounded-lg p-2 mb-1.5 px-5 active:bg-green-500"
            onClick={handleClick}
          >
            Login
          </button>
          <button
            className="bg-green-300 rounded-lg p-2 mb-1.5 px-5 active:bg-green-500"
            onClick={() => navigate("/Register")}
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
