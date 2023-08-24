import React from "react";
import Consultar from "./Consultar";
import Añadir from "./Añadir";

function Container() {
  return (
    <>
      <div className="">
        <div className="container max-w-xs mx-auto rounded outline outline-1 outline-gray-300 shadow-lg m-5 py-1">
          <h1 className="flex items-center justify-center font-3xl font-bold text-lg my-3">
            Ingrese los datos del empleado
          </h1>
          <Añadir />
        </div>
        <div className="container mx-auto rounded outline outline-1 outline-gray-300 shadow-lg m-5 py-1 p-3 w-4/5">
          <Consultar />
        </div>
      </div>
    </>
  );
}

export default Container;
