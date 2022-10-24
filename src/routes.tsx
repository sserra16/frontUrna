import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Votacao from "./pages/Votacao";
import Dashboard from "./pages/Dashboard";

export default function classRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Votacao" element={<Votacao />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  );
}
