// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import IncidentList from "./components/IncidentList";
import IncidentForm from "./components/IncidentForm";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Categoria from "./pages/Categoria/Categoria";
import UnidadeAdministrativa from "./pages/UnidadeAdministrativa/UnidadeAdministrativa";
import Usuario from "./pages/Usuario/Usuario";
import Home from "./pages/Home/Home";
import MainLayout from "./components/MainLayout/MainLayout";
import Login from "./pages/Login/Login";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          
          <Route 
            path="/home"
            element={
              <Home />
            }
          />
          <Route 
            path="/"
            element={
              <MainLayout />
            }
          />

          <Route
            path="/login"
            element={
              <Login />
            }
          />
          <Route
            path="/categorias"
            element={
              <MainLayout>
                <Categoria />
              </MainLayout>
            }
          />
          <Route
            path="/unidades"
            element={
              <MainLayout>
                <UnidadeAdministrativa />
              </MainLayout>
            }
          />
          <Route
            path="/usuarios"
            element={
              <MainLayout>
                <Usuario />
              </MainLayout>
            }
          />

          {/* 🔹 Rota de fallback (qualquer URL desconhecida redireciona para Home) */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
