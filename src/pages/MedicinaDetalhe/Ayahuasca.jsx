import "./Ayahuasca.css";

import jagube from "../../assets/imagens/jagube.jpg";


function Ayahuasca() {


  return (


    <main className="ayahuasca-page">



      <section className="ayahuasca-hero">


        <img

          src={jagube}

          alt="Jagube, planta utilizada no preparo tradicional da Ayahuasca"

        />



        <div className="ayahuasca-titulo">


          <h1>
            Medicina da Ayahuasca
          </h1>


          <p>
            Um caminho ancestral de conexão, presença e autoconhecimento.
          </p>


        </div>


      </section>






      <section className="ayahuasca-texto">


        <h2>
          A força da floresta
        </h2>


        <p>

          A Ayahuasca é uma medicina ancestral da floresta,
          utilizada tradicionalmente por diversos povos originários
          da Amazônia em seus rituais de conexão espiritual,
          conhecimento interior e fortalecimento da relação com a natureza.

        </p>


        <p>

          Seu preparo representa uma união sagrada entre plantas
          da floresta, recebidas com respeito, intenção e responsabilidade.

        </p>


      </section>







      <section className="ayahuasca-destaque">


        <h2>
          As plantas sagradas
        </h2>



        <p>

          A preparação tradicional da Ayahuasca envolve principalmente
          a união de duas plantas:

        </p>



        <h3>
          Jagube (Banisteriopsis caapi)
        </h3>



        <p>

          Conhecido como cipó da alma, o Jagube é um cipó amazônico
          considerado pelos povos da floresta como um elemento essencial
          da medicina.

        </p>





        <h3>
          Chacrona (Psychotria viridis)
        </h3>



        <p>

          Também conhecida como rainha da floresta, a Chacrona é uma
          folha utilizada tradicionalmente junto ao Jagube na preparação
          da bebida.

        </p>



      </section>







      <section className="ayahuasca-texto">


        <h2>
          Um caminho de conexão
        </h2>


        <p>

          Dentro das tradições que utilizam a Ayahuasca, ela é recebida
          como um caminho de expansão da consciência, reflexão e
          reconexão com a espiritualidade.

        </p>


        <p>

          Cada experiência é única e deve ser conduzida com respeito,
          preparo, responsabilidade e intenção.

        </p>



      </section>








      <section className="frase-ayahuasca">


        <h2>

          "A floresta ensina em silêncio.
          Basta abrir o coração para escutar."

        </h2>


      </section>




    </main>


  );

}


export default Ayahuasca;