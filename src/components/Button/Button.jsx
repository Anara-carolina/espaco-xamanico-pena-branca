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

        <h2>Sobre Nós</h2>

        <p>
          O Espaço Xamânico Pena Branca nasceu com o propósito de acolher,
          conectar e servir. Criamos um ambiente onde a natureza, a
          espiritualidade e as medicinas sagradas da floresta caminham juntas,
          oferecendo momentos de cura, amor, respeito e transformação.
        </p>

        <button>
          Saiba mais
        </button>

      </div>

    </section>
  );
}

export default Button;