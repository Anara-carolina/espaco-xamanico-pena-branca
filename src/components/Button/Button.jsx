import { Link } from "react-router-dom";

import "./Button.css";
import imagemLobo from "../../assets/imagens/lobo.jpg";

function Button() {
  return (
    <section className="sobre">

      <img
        src={imagemLobo}
        alt="Lobo"
        className="sobre-imagem"
      />

      <div className="sobre-conteudo">

        <h2>
          Sobre Nós
        </h2>

        <p>
          Há dois anos, o Espaço Xamânico Pena Branca vem caminhando com
          propósito, conduzindo cerimônias e encontros com as medicinas
          sagradas da floresta. Nascemos com o propósito de acolher,
          conectar e servir, criando um espaço onde a natureza, a
          espiritualidade e os saberes ancestrais caminham juntos.
        </p>

        <p>
          Ao longo dessa caminhada, compartilhamos momentos de cura,
          aprendizado, amor, respeito e transformação, sempre honrando
          a força da floresta e a sabedoria daqueles que vieram antes de nós.
        </p>

        <Link to="/sobre">
          <button type="button">
            Saiba mais
          </button>
        </Link>

      </div>

    </section>
  );
}

export default Button;