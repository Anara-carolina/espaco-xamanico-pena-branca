import "./Kambo.css";

import sapo from "../../assets/imagens/sapo.jpg";


function Kambo() {


  return (


    <main className="kambo-page">



      <section className="kambo-hero">


        <img

          src={sapo}

          alt="Sapo da floresta relacionado à tradição do Kambô"

        />



        <div className="kambo-titulo">


          <h1>
            Medicina do Kambô
          </h1>


          <p>
            Uma tradição ancestral de conexão com a força da floresta.
          </p>


        </div>


      </section>







      <section className="kambo-texto">


        <h2>
          A força da floresta
        </h2>


        <p>

          O Kambô é uma prática tradicional amazônica associada aos
          conhecimentos ancestrais de alguns povos originários da floresta,
          especialmente povos indígenas que guardam essa sabedoria há
          muitas gerações.

        </p>


        <p>

          Essa tradição envolve a utilização da secreção do sapo conhecido
          cientificamente como Phyllomedusa bicolor, chamado por muitos
          povos de sapo da floresta ou sapo kampô.

        </p>


      </section>







      <section className="kambo-destaque">


        <h2>
          O conhecimento ancestral
        </h2>



        <p>

          Para os povos tradicionais que utilizam essa prática, o Kambô
          faz parte de um contexto espiritual e cultural, ligado à
          preparação, força, intenção e conexão com a natureza.

        </p>



        <p>

          Cada tradição possui seus próprios conhecimentos e formas de
          conduzir seus rituais, sempre com respeito aos ensinamentos
          recebidos pelos ancestrais.

        </p>



      </section>







      <section className="kambo-texto">


        <h2>
          Respeito e responsabilidade
        </h2>



        <p>

          O contato com as medicinas da floresta exige respeito,
          consciência e responsabilidade. Honramos os povos originários,
          seus territórios, suas culturas e seus conhecimentos ancestrais.

        </p>



        <p>

          A floresta nos ensina sobre equilíbrio, humildade e conexão.
          Caminhamos reconhecendo que esses saberes pertencem a uma
          história muito maior que nós.

        </p>



      </section>








      <section className="frase-kambo">


        <h2>

          "A força da natureza nos lembra que fazemos parte de algo maior."

        </h2>


      </section>




    </main>


  );

}


export default Kambo;