import "./Sananga.css";

import sananga from "../../assets/imagens/sananga.jpg";


function Sananga() {


  return (


    <main className="sananga-page">



      <section className="sananga-hero">


        <img

          src={sananga}

          alt="Sananga, medicina tradicional da floresta"

        />



        <div className="sananga-titulo">


          <h1>
            Medicina da Sananga
          </h1>


          <p>
            Um caminho ancestral de presença, foco e conexão.
          </p>


        </div>


      </section>







      <section className="sananga-texto">


        <h2>
          A medicina dos olhos da floresta
        </h2>


        <p>

          A Sananga é uma medicina tradicional amazônica utilizada
          por diversos povos originários como parte de seus rituais
          de conexão, preparação e fortalecimento da presença.

        </p>


        <p>

          Ela é preparada a partir da casca e das raízes da planta
          Tabernaemontana sananho, uma espécie encontrada na região
          amazônica e utilizada tradicionalmente pelos povos da floresta.

        </p>


      </section>








      <section className="sananga-destaque">


        <h2>
          Como a Sananga é preparada
        </h2>



        <p>

          Tradicionalmente, a preparação da Sananga envolve o preparo
          das partes da planta através de processos artesanais realizados
          pelos conhecedores da floresta.

        </p>



        <p>

          Cada comunidade possui seus próprios conhecimentos e formas
          de preparo, respeitando a tradição transmitida pelos seus
          ancestrais.

        </p>



      </section>







      <section className="sananga-texto">


        <h2>
          Tradição e conexão
        </h2>



        <p>

          Dentro das tradições amazônicas, a Sananga é recebida como
          uma medicina de intenção e presença, utilizada em momentos
          de preparação espiritual e conexão interior.

        </p>



        <p>

          Honramos os povos originários, guardiões desses conhecimentos,
          reconhecendo a importância de seus saberes e da relação sagrada
          que possuem com a floresta.

        </p>



      </section>








      <section className="frase-sananga">


        <h2>

          "A floresta revela novos caminhos quando aprendemos a enxergar
          com o coração."

        </h2>


      </section>





    </main>


  );

}


export default Sananga;