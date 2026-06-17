import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Acolhimento from "../pages/Acolhimento";
import Denuncia from "../pages/Denuncia";
import Dashboard from "../pages/Dashboard";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                 <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/acolhimento" element={<Acolhimento />} />
                <Route path="/denuncia" element={<Denuncia />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;


