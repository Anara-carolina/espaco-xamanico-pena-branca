import "./Sobre.css";

import floresta from "../../assets/imagens/sobre.jpeg";

function Sobre() {
  return (
    <main className="sobre-page">

      <section className="sobre-hero">

        <img
          src={floresta}
          alt="Floresta representando conexão com a natureza"
        />

        <div className="sobre-titulo">

          <h1>
            Nossa História
          </h1>

          <p>
            Dois anos de caminhada, amor, conexão e respeito pela floresta.
          </p>

        </div>

      </section>


      <section className="sobre-texto">

        <h2>
          O chamado do Pena Branca
        </h2>

        <p>
          O Espaço Xamânico Pena Branca nasceu de um chamado de amor e
          união. Há dois anos, iniciamos nossa caminhada com o propósito
          de acolher, conectar e compartilhar caminhos de cura através
          das medicinas sagradas da floresta.
        </p>

        <p>
          Desde então, temos caminhado juntos, conduzindo cerimônias,
          encontros e momentos de conexão com a natureza, buscando
          preservar a essência de um espaço de respeito, presença,
          acolhimento e transformação.
        </p>

        <p>
          Ao longo desses dois anos, cada encontro, cada pessoa e cada
          experiência fizeram parte da construção da nossa história.
          Seguimos aprendendo, servindo e fortalecendo esse caminho com
          amor e respeito.
        </p>

      </section>


      <section className="sobre-destaque">

        <h2>
          Um espaço sem valor de troca
        </h2>

        <p>
          O Pena Branca nasceu através da vontade de servir. Um espaço
          onde a medicina é compartilhada através da caridade, do amor
          e da intenção de levar acolhimento, conexão e transformação.
        </p>

        <p>
          Acreditamos que o cuidado, a espiritualidade e a conexão
          devem ser guiados pelo coração, pela entrega e pelo propósito.
          Durante esses dois anos, seguimos firmes nessa intenção,
          construindo nosso caminho através de cada cerimônia e de cada
          encontro.
        </p>

      </section>


      <section className="sobre-texto">

        <h2>
          Amor pela floresta e respeito ancestral
        </h2>

        <p>
          Caminhamos com profundo respeito pelos povos originários,
          guardiões de conhecimentos ancestrais que atravessam gerações.
        </p>

        <p>
          Honramos seus ensinamentos, sua relação sagrada com a natureza
          e a sabedoria da floresta, reconhecendo que fazemos parte dela.
        </p>

        <p>
          É com esse respeito que seguimos nossa caminhada, buscando
          manter viva a conexão com a floresta e com os ensinamentos
          que inspiram o trabalho do Espaço Xamânico Pena Branca.
        </p>

      </section>


      <section className="frase-sobre">

        <h2>
          "Quando nos reconectamos com a natureza,
          lembramos quem realmente somos."
        </h2>

      </section>


    </main>
  );
}

export default Sobre;
