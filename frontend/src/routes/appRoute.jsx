import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Acolhimento from "../pages/Acolhimento";
import Denuncia from "../pages/Denuncia";
import Dashboard from "../pages/Dashboard";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/acolhimento" element={<Acolhimento />} />
                <Route path="/denuncia" element={<Denuncia />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;



