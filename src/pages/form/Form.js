import React from "react";
import "./Form.css";
import axios from "axios";
import { Dropdown, Modal, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Form({noticias}) {
  const [formData, setFormData] = React.useState({});
  const [validado, setValidado] = React.useState(false);
  const [direccionesDisponibles, setDireccionesDisponibles] =React.useState([]);
  const [normalizado, setNormalizado] = React.useState(false);
  const navigate = useNavigate();

  const validar = async () => {
    try {
      axios
        .get(
          "https://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=" +
            formData.direccion +
            "," +
            formData.localidad +
            "&maxOptions=25"
        )
        .then((response) => {
          setDireccionesDisponibles(response.data.direccionesNormalizadas);
          setValidado(true);
        });
    } catch (error) {
      console.error(error);
    }
  };


  const normalizarDireccion = async (d) => {
    if (d.coordenadas.x && d.coordenadas.y) {
      setNormalizado(true);
      toast.success("Direccion normalizada correctamente");
      setValidado(false);
    } else {
      toast.error("No se pudo normalizar la direccion");
    }
  };

  const crearNoticia = async () => {
    try {
      localStorage.setItem("formNewNoticia", JSON.stringify(formData));
      noticias.push(formData);
      navigate("/noticia/9?new=true");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="container">
      <header>Registrar nueva noticia</header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="form"
      >
        <div className="input-box">
          <label>Titulo de la noticia</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                tituloNoticia: e.target.value,
              });
            }}
            placeholder="Nombre de la noticia"
            type="text"
          />
        </div>
        <div className="column">
          <div className="input-box">
            <label>Descripcion</label>
            <input
              onChange={(e) => {
                setFormData({
                  ...formData,
                  descripcion: e.target.value,
                });
              }}
              placeholder="Descripcion de la noticia"
              type="text"
            />
          </div>
          <div className="input-box">
            <label>Tema</label>
            <input
              onChange={(e) => {
                setFormData({
                  ...formData,
                  tema: e.target.value,
                });
              }}
              placeholder="Tema de la noticia"
              type="text"
            />
          </div>
        </div>
        <div className="gender-box">
          <label>Noticia visible en mapas:</label>
          <div className="gender-option">
            <Dropdown
              placeholder="Seleccionar"
              onChange={(e, { value }) => {
                setFormData({
                  ...formData,
                  visibilidad: value,
                });
              }}
              fluid
              selection
              options={[
                { key: "Si", text: "Si", value: "Si" },
                { key: "No", text: "No", value: "No" },
              ]}
            />
          </div>
        </div>
        <div className="input-box address">
          <div class="column">
            <div className="input-box">
              <label>Address</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    direccion: e.target.value,
                  });
                }}
                placeholder="Enter street address"
                type="text"
              />
            </div>
            <div className="input-box">
              <label>Localidad</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    localidad: e.target.value,
                  });
                }}
                placeholder="Enter street address"
                type="text"
              />
            </div>
          </div>
          <Button
            color="green"
            onClick={() => {
              validar();
            }}
          >
            {normalizado
              ? "Direccion Validada Correctamente"
              : "Validar Direccion"}
          </Button>
          <div className="column">
            <input
              onChange={(e) => {
                setFormData({
                  ...formData,
                  imagen: e.target.value,
                });
              }}
              placeholder="Imagen en URL"
              type="text"
            />
          </div>
        </div>
      </form>
      <Button
        color="orange"
        className="crear-noticia"
        onClick={() => {
          crearNoticia();
        }}
      >
        Crear Noticia
      </Button>

      <Modal
        open={validado}
        content={
          <div className="modal">
            <h2 className="modal-title">Seleccionar Su direccion Correcta</h2>
            {direccionesDisponibles.length > 0 ? (
              direccionesDisponibles.map((direccion) => {
                return (
                  <button
                    onClick={async () => {
                      console.log(direccion);
                      setFormData({
                        ...formData,
                        direccion: direccion.direccion,
                        x: direccion.coordenadas.x,
                        y: direccion.coordenadas.y,
                      });
                      //setDireccionNormalizada(direccion);
                      normalizarDireccion(direccion);
                    }}
                    type="button"
                    class="button-l"
                  >
                    <span class="button__text">{direccion.direccion}</span>
                    <span class="button__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke="currentColor"
                        height="24"
                        fill="none"
                        class="svg"
                      >
                        <line y2="19" y1="5" x2="12" x1="12"></line>
                        <line y2="12" y1="12" x2="19" x1="5"></line>
                      </svg>
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="modal-content">
                <p className="no-hay-direcciones">No se encontraron direcciones</p>
              </div>
            )}

            <div class="buttons">
              <button onClick={() => setValidado(false)} class="btn1">
                <span></span>
                <p
                  data-start="good luck!"
                  data-text="Hasta Luego!"
                  data-title="Cerrar"
                ></p>
              </button>
            </div>
          </div>
        }
      />
      <ToastContainer />
    </section>
  );
}
