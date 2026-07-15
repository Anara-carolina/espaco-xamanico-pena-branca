import "./Rape.css";

import rape from "../../assets/imagens/rape.jpg";


function Rape() {


  return (


    <main className="rape-page">



      <section className="rape-hero">


        <img

          src={rape}

          alt="Rapé sagrado da floresta"

        />



        <div className="rape-titulo">


          <h1>
            Medicina do Rapé
          </h1>


          <p>
            O sopro sagrado da floresta e a força da presença.
          </p>


        </div>


      </section>







      <section className="rape-texto">


        <h2>
          O sopro da floresta
        </h2>


        <p>

          O Rapé é uma medicina tradicional utilizada por diversos
          povos originários da Amazônia como um instrumento de conexão,
          oração, concentração e fortalecimento da presença.

        </p>


        <p>

          Recebido através do sopro, o Rapé representa um momento de
          entrega, silêncio e conexão com a força da floresta e com
          os ensinamentos ancestrais.

        </p>


      </section>







      <section className="rape-destaque">


        <h2>
          A sabedoria dos povos originários
        </h2>



        <p>

          O uso tradicional do Rapé pertence aos conhecimentos ancestrais
          de povos indígenas amazônicos, que preservam essa prática
          através de suas gerações.

        </p>



        <p>

          Honramos esses saberes com respeito, reconhecendo a importância
          dos povos originários como guardiões da floresta e de suas
          medicinas tradicionais.

        </p>



      </section>







      <section className="rape-texto">


        <h2>
          Presença e conexão
        </h2>



        <p>

          Dentro das tradições que utilizam o Rapé, ele é recebido como
          um momento de alinhamento, presença e conexão espiritual.

        </p>



        <p>

          Cada sopro carrega uma intenção. Por isso, sua utilização é
          conduzida com respeito, responsabilidade e consciência.

        </p>



      </section>








      <section className="frase-rape">


        <h2>

          "O sopro traz a força da floresta,
          o silêncio revela o caminho interior."

        </h2>


      </section>




    </main>


  );

}


export default Rape;