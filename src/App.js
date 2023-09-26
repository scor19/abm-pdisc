import "./App.css";
import Container from "./components/Container";
import Consultar from "./components/Consultar";
import Editar from "./components/Editar";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="container" element={<Container/>} />
        <Route path="/" element={<Login />} />
        <Route path="consulta" element={<Consultar />} />
        <Route path="editar/:id" element={<Editar />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
