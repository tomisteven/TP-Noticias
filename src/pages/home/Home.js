import "./home.css";
import { Icon } from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home({ noticias }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [hasAdded, setHasAdded] = useState(false); 

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const nuevonoticia = queryParams.get("create");

    if (nuevonoticia && !hasAdded) {
      const nuevaNoticia = JSON.parse(localStorage.getItem("formNewNoticia"));
      const yaExiste = noticias.some(
        (n) => n.tituloNoticia === nuevaNoticia?.tituloNoticia
      );

      if (nuevaNoticia && !yaExiste) {
        noticias.push(nuevaNoticia);
        setHasAdded(true); 
      }
    }
  }, [location.search, noticias, hasAdded]);

 

  return (
   <>
      <div className="titulo-noticias">
        <h1>SM NOTICIAS</h1>
      </div>

      <div className="container-noticias">
        {noticias.map((noticia) => (
          <div className="nft" key={noticia.id}>
            <div className="main" onClick={() => navigate(`/noticia/${noticia.id}`)}>
              <img
                className="tokenImage"
                src={
                  noticia.imagen
                    ? noticia.imagen
                    : "https://www.clarin.com/img/2020/08/17/6BOqG1XGY_720x0__1.jpg"
                }
                alt="NFT"
              />
              <h2>
                {noticia.tituloNoticia} <Icon name="home" color="brown" />
              </h2>
              <p className="description">
              {noticia.descripcion.length > 100
              ? noticia.descripcion.slice(0, 100) + "..."
              : noticia.descripcion}
              </p>
              <div className="tokenInfo">
                <div className="price">{noticia.direccion}</div>
                <div className="duration">
                  <ins>◷</ins>
                  <p>{noticia.fecha}</p>
                </div>
              </div>
              <hr />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}