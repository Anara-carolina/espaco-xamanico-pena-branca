import "./Sobre.css";

import floresta from "../../assets/imagens/floresta.jpg";


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
            Um caminho de amor, conexão e respeito pela floresta.
          </p>

        </div>


      </section>





      <section className="sobre-texto">


        <h2>
          O chamado do Pena Branca
        </h2>


        <p>

          O Espaço Xamânico Pena Branca nasceu de um chamado de amor e
          união. Um espaço criado com o propósito de acolher,
          conectar e compartilhar caminhos de cura através das medicinas
          sagradas da floresta.

        </p>


        <p>

          Nossa intenção é oferecer um ambiente de respeito, presença e
          acolhimento, onde cada pessoa possa se reconectar com sua essência,
          com a natureza e com a força ancestral que habita dentro de cada ser.

        </p>


      </section>






      <section className="sobre-destaque">


        <h2>
          Um espaço sem valor de troca
        </h2>


        <p>

          O Pena Branca nasceu através da vontade de servir.
          Um espaço onde a medicina é compartilhada através da caridade,
          do amor e da intenção de levar cura e transformação.

        </p>


        <p>

          Acreditamos que o cuidado, a espiritualidade e a conexão
          devem ser guiados pelo coração, pela entrega e pelo propósito.

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