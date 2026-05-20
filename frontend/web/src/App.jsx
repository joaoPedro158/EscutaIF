// web/src/App.jsx
import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
    // Estado para controlar se o usuário está logado no painel administrativo
    const [isAutenticado, setIsAutenticado] = useState(false);

    const handleLoginSuccess = () => {
        setIsAutenticado(true);
    };

    return (
        <>
            {isAutenticado ? (
                <Dashboard />
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </>
    );
}