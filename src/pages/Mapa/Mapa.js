import React, { useEffect, useState, useMemo } from "react";
import "./Mapa.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import mapa from "../../assets/mapa.png";
import { Icon } from "semantic-ui-react";

export default function Mapa({ noticias }) {
  const [active, setActive] = useState(null);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  const noticiaG = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("formNewNoticia"));
    } catch (e) {
      console.error("Error al parsear noticiaG", e);
      return null;
    }
  }, []);

  useEffect(() => {
    if (!id || !noticias?.length) return;

    if (id !== "99") {
      const noticia = noticias.find((e) => e.id === parseInt(id));
      setActive(noticia || null);
      console.log("noticia", noticia);
    } else {
      setActive(noticiaG || null);
      console.log("noticiaG", noticiaG);
    }
  }, [id, noticias]); // ✅ no incluyas noticiaG aquí

  return (
    <div className="container-mapa">
      <div className="cont-info-noticias">
        {noticias.map((noticia) => (
          <div className="noticias" key={noticia.id}>
            <img src={noticia.imagen} alt={noticia.nombre} />
            <p className="btn-ver-mapa" onClick={() => setActive(noticia)}>
              <Icon name="map marker alternate" color="red" /> Ver en el mapa
            </p>
            <h2>
              <Icon name="home" color="brown" /> {noticia.tituloNoticia}
            </h2>
            <p className="desc">
              <Icon name="info" color="red" />
              {noticia.descripcion}
            </p>
            <p>
              <Icon name="street view" color="orange" />
              <span>Dirección:</span> {noticia.direccion}
            </p>
            <p>
              <Icon name="pin" color="green" />
              <span>Localidad:</span> {noticia.localidad}
            </p>
            <p>
              <Icon name="phone" color="blue" />
              <span>Teléfono:</span> {noticia.telefono}
            </p>
            <p>
              <Icon name="clock" color="black" />
              <span>Fecha:</span> {noticia.fecha}
            </p>
            <p>
              <Icon name="map marker alternate" color="red" />
              <span>Provincia:</span> {noticia.provincia}
            </p>
          </div>
        ))}
      </div>

      <MapContainer
        center={
          active
            ? [active.x, active.y]
            : [-34.4938511979592, -58.6364124734694]
        }
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {noticias.map((noticia) => (
          <Marker
            key={noticia.id}
            icon={new L.Icon({ iconUrl: mapa, iconSize: [40, 40] })}
            position={[noticia.y, noticia.x]}
            eventHandlers={{
              click: () => setActive(noticia),
            }}
          />
        ))}
        {active && (
          <Popup
            position={[active.y, active.x]}
            onClose={() => setActive(null)}
          >
            <div>
              <img className="img-popup" src={active.imagen} alt="mapa" />
              <h2>{active.tituloNoticia}</h2>
              <p>{active.descripcion}</p>
              <p>{active.fecha}</p>
              <p>{active.direccion}</p>
              <p>{active.localidad}</p>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
}
