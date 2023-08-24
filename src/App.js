import "./App.css";
import Container from "./components/Container";
import Consultar from "./components/Consultar";
import Editar from "./components/Editar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="consulta" element={<Consultar />} />
        <Route path="editar/:id" element={<Editar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
