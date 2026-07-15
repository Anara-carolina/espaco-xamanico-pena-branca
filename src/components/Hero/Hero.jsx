import imagemMobile from "../../assets/imagens/pmobile.jpg";
import imagemDesktop from "../../assets/imagens/pdesktop.png";

import { Link } from "react-router-dom";

import "./Hero.css";


function Hero() {
  return (
    <section className="hero">

      <picture>

        <source
          media="(min-width: 768px)"
          srcSet={imagemDesktop}
        />

        <img
          src={imagemMobile}
          alt="Espaço Xamânico Pena Branca"
        />

      </picture>


      <div className="hero-content">

        <h1>
          PENA BRANCA
        </h1>


        <h3>
          Cultura • Natureza • Espiritualidade • Ancestralidade
        </h3>


        <p>
          Conecte com a floresta, com a medicina e consigo mesmo.
        </p>


        <Link to="/sobre">

          <button type="button">
            Conheça nossa história
          </button>

        </Link>


      </div>

    </section>
  );
}


export default Hero;