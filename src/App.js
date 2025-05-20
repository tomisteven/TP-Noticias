import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";

import Header from "./components/Header/Header";
import Mapa from "./pages/Mapa/Mapa";
import Form from "./pages/form/Form";
import Login from "./pages/login/Login";
import Noticia from "./pages/noticia/Noticia";

function App() {
  const [noticias, setNoticias] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Rol actual, persistido en localStorage
  const storedRole = localStorage.getItem("role") || "Espectador";
  const [role, setRole] = useState(storedRole);

  useEffect(() => {
    localStorage.setItem("role", role);
    fetchNoticias();
  }, [role]);

  const fetchNoticias = async () => {
    try {
      const response = await fetch("http://localhost:3001/");
      if (!response.ok) throw new Error("Error al obtener noticias");
      const data = await response.json();
      setNoticias(data);
    } catch (error) {
      console.error("Error cargando noticias:", error);
    }
  };

  const handleFiltroNoticias = (e) => {
    setBusqueda(e.target.value);
  };

  const noticiasFiltradas = noticias.filter((noticia) =>
    noticia.tituloNoticia.toLowerCase().includes(busqueda.toLowerCase())
  );

  const rutas = [
    {
      path: "/",
      element: <Home noticias={noticiasFiltradas} />,
      rolesPermitidos: ["admin", "Vecino", "Espectador"],
    },

    {
      path: "/mapa",
      element: <Mapa noticias={noticias} />,
      rolesPermitidos: ["admin", "Vecino", "Espectador"],
    },
    {
      path: "/form",
      element: <Form noticias={noticias} />,
      rolesPermitidos: ["admin"],
    },
    {
      path: "/login",
      element: <Login />,
      rolesPermitidos: ["Espectador"],
    },
    {
      path: "/noticia/:id",
      element: <Noticia role={role} noticias={noticias} />,
      rolesPermitidos: ["admin", "Vecino", "Espectador"],
    },
  ];

  return (
    <div className="App">
      <Header
        role={role}
        filterNoticias={handleFiltroNoticias}
        getNoticias={fetchNoticias}
      />

      <Routes>
        {rutas
          .filter((ruta) => ruta.rolesPermitidos.includes(role))
          .map(({ path, element }, idx) => (
            <Route key={idx} path={path} element={element} />
          ))}

        {/* Ruta fallback (opcional) */}
        {/* <Route path="*" element={<div>Ruta no encontrada</div>} /> */}
      </Routes>
    </div>
  );
}

export default App;
