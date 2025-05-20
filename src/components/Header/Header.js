import { useState } from "react";
import "./Header.css"; // Importa estilos CSS
import logo from "../../assets/newspaper.jpg"; // Importa imagen

const Header = ({ filterNoticias, role }) => {
  const [showSearch, setShowSearch] = useState(false); // Estado para mostrar/ocultar buscador
  console.log(role);

  const toggleSearch = () => {
    setShowSearch(!showSearch); // Cambia el estado del buscador
  };

  const validarRol = () => {
    if (role === "admin") {
      return "Administrador";
    } else if (role === "Vecino" || role === "vecino") {
      return "Vecino";
    } else {
      return "Espectador";
    }
  };

  const requires = [
    {
      path: "/",
      name: "Inicio",
      roles: ["admin", "Vecino", "Espectador"],
    },
    {
      path: "/mapa",
      name: "Mapa",
      roles: ["admin", "Vecino", "Espectador"],
    },
    {
      path: "/form",
      name: "Nueva Noticia",
      roles: ["admin"],
    },
    {
      path: "/login",
      name: "Login",
      roles: ["Espectador"],
    },
    {
      path: "/",
      roles: ["admin", "Vecino"],
      name: "Cerrar Sesion",
      logout: () => {
        localStorage.removeItem("role");
      },
    },
  ];

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="header__search">
        <input
          disabled={
            window.location.pathname === "/mapa" ||
            window.location.pathname === "/form"
          }
          type="text"
          placeholder="Buscar noticia..."
          className="header__search-input"
          onFocus={toggleSearch}
          onBlur={toggleSearch}
          onChange={filterNoticias}
        />
        <i
          className={`fas fa-search header__search-icon ${
            showSearch ? "active" : ""
          }`}
          onClick={toggleSearch}
        ></i>
      </div>

      <Navigation requires={requires} role={role} />
      <h4 className="rol-h4">ROL: {validarRol()}</h4>
    </header>
  );
};

const Navigation = ({ requires, role }) => {
  return (
    <nav>
      {requires.map((require) => {
        const isEnabled = require.roles.includes(role);
        return (
          <a
            key={require.path}
            href={isEnabled ? require.path : ""}
            className="header-links"
            aria-disabled={!isEnabled}
            hidden={!isEnabled}
            onClick={require?.logout}
          >
            {require.name}
          </a>
        );
      })}
    </nav>
  );
};

export default Header;
