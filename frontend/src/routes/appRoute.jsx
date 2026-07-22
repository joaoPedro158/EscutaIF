import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../enum/rotas";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Acolhimento from "../pages/Acolhimento";
import Denuncia from "../pages/Denuncia";
import Dashboard from "../pages/Dashboard";
import Cadastra from "../pages/Cadastra";
import DetalheDenuncia from "../pages/DetalheDenuncia";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.HOME_ALIAS} element={<Home />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.ACOLHIMENTO} element={<Acolhimento />} />
                <Route path={ROUTES.DENUNCIA} element={<Denuncia />} />
                <Route path={ROUTES.CADASTRA} element={<Cadastra />} />
                <Route path={ROUTES.DENUNCIA_DETALHE} element={<DetalheDenuncia />} />
                <Route path={`${ROUTES.DENUNCIA_DETALHE}/:id`} element={<DetalheDenuncia />} />
                <Route path="*" element={<Navigate to="/login" replace />} />

                <Route element={<ProtectedRoute />}>
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

                    {/* <Route path={ROUTES.CADASTRA} element={<Cadastra />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
                

export default AppRoutes;

