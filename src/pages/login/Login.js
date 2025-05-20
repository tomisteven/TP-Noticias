import "./login.css";

export default function Login() {
  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input className="toggle" type="checkbox" />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className="flip-card__inner">
            <div className="flip-card__front">
              <div className="title">Log in</div>
              <form className="flip-card__form">
                <input
                  type="email"
                  placeholder="Email"
                  className="flip-card__input"
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="flip-card__input"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.setItem("role", "admin");
                    window.location.href = "/";
                  }}
                  className="flip-card__btn"
                >
                  Entrar
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.setItem("role", "Vecino");
                    window.location.href = "/";
                  }}
                  className="flip-card__btn"
                >
                  Entrar como Vecino
                </button>
              </form>
            </div>
            <div className="flip-card__back">
              <div className="title">Sign up</div>
              <form className="flip-card__form">
                <input
                  type="name"
                  placeholder="Name"
                  className="flip-card__input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="flip-card__input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="flip-card__input"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Sign up");
                    localStorage.setItem("role", "Vecino");
                    window.location.href = "/";
                  }}
                  className="flip-card__btn"
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
