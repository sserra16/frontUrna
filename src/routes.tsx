import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Votacao from "./pages/Votacao";


export default function classRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Votacao" element={<Votacao />} />
    </Routes>
  );
}
