import "./noticia.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Noticia({ noticias, role }) {
  const { id: noticiaId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const newNoticia = searchParams.get("new");
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    console.log(newNoticia);

    if (newNoticia) {
      const nuevaNoticia = JSON.parse(localStorage.getItem("formNewNoticia"));
      setNoticia(nuevaNoticia);
      console.log("nuevaNoticia", nuevaNoticia);

      const yaExiste = noticias.some(
        (n) => n.tituloNoticia === nuevaNoticia?.tituloNoticia
      );

      if (nuevaNoticia && !yaExiste) {
        noticias.push(nuevaNoticia);
        navigate(`/noticia/${nuevaNoticia.id}`);
      }
    } else {
      const noticia = noticias.find((n) => n.id === parseInt(noticiaId));
      if (!noticia) {
        console.warn("Noticia no encontrada");
      }
    }
  }, [noticiaId, noticias, newNoticia, navigate]);

  if (!noticias.length) {
    return <div className="detalle-noticia">Cargando noticia...</div>;
  }

  if (!noticia) {
    return (
      <div className="detalle-noticia">
        <h2>No se encontró la noticia solicitada.</h2>
        <button onClick={() => navigate("/")}>Volver al inicio</button>
      </div>
    );
  }

  const generarLinkMapa = () => {
    if (newNoticia) {
      const url = new URL("http://localhost:3000/mapa");
      url.searchParams.set("id", 99);
      window.location.href = url;
    } else {
      const url = new URL("http://localhost:3000/mapa");
      url.searchParams.set("id", noticia.id);
      window.location.href = url;
    }
  };

  return (
    <div className="detalle-noticia">
      <h1>{noticia.tituloNoticia}</h1>

      <img
        src={
          noticia.imagen
            ? noticia.imagen
            : "https://www.clarin.com/img/2020/08/17/6BOqG1XGY_720x0__1.jpg"
        }
        alt={noticia.tituloNoticia}
      />

      {noticia.descripcion.split("|").map((parrafo, index) => (
        <p key={index}>{parrafo.trim()}</p>
      ))}

      <div className="info-extra">
        <strong>Dirección:</strong> {noticia.direccion}
      </div>

      <div className="info-extra">
        <strong>Fecha:</strong> {noticia.fecha}
      </div>

      <button className="boton-mapa" onClick={generarLinkMapa}>
        Ver dirección en el mapa
      </button>

      {role === "Vecino" && (
        <>
          <input
            type="text"
            placeholder="Comentario"
            className="input-comentario"
          />
          <button
            className="boton-mapa-comentario"
            onClick={() => {
              const url = new URL("http://localhost:3000/form");
              url.searchParams.set("id", noticia.id);
              window.location.href = url;
            }}
          >
            Comentar Noticia
          </button>
        </>
      )}
    </div>
  );
}
