import { Link } from "react-router-dom";

import "./Cerimonias.css";
import imagemCerimonia from "../../assets/imagens/ritual.jpg";


function Cerimonias() {

  return (

    <div className="cerimonias-page">


      {/* IMAGEM TOPO */}

      <section className="cerimonias-hero">

        <img
          src={imagemCerimonia}
          alt="Cerimônia xamânica na floresta"
        />


        <div className="cerimonias-titulo">

          <h1>
            Cerimônias
          </h1>

          <p>
            Um encontro de conexão, presença e respeito à medicina da floresta.
          </p>

        </div>


      </section>



      {/* TEXTO */}

      <section className="cerimonias-texto">


        <h2>
          Preparação para a cerimônia
        </h2>


        <p>
          Os dias que antecedem a cerimônia são um momento de preparação
          do corpo, da mente e do espírito. Recomendamos que três dias antes que tenham 
          alguns cuidados importantes para vivenciar esse encontro com mais presença,
          respeito e conexão.
        </p>


        <ul className="cerimonias-lista">

          <li>
            🥗 Evitar o consumo de carne;
          </li>

          <li>
            🤍 Não ter relações sexuais;
          </li>

          <li>
            🚫 Não utilizar drogas ou bebidas alcoólicas;
          </li>

          <li>
            💊 Suspender medicamentos somente conforme orientação do facilitador.
          </li>

        </ul>


      </section>




      {/* BLOCO VERDE */}

      <section className="cerimonias-destaque">


        <h2>
          🎒 O que levar
        </h2>


        <p>
          Colchonete, travesseiro, duas garrafas de água,
          papel higiênico, cobertor ou agasalho e uma troca
          de roupa confortável.
        </p>



        <h3>
          🕒 Horários
        </h3>


        <p>
          Chegada: 15h30
          <br/>
          Início após acolhimento do grupo.
          <br/>
          Encerramento previsto: 22h00.
          <br/>
          Permanência no espaço até 00h00 para integração e partilhas.
        </p>


      </section>




      {/* FINAL */}

      <section className="frase-cerimonia">


        <h2>
          Que sua caminhada até a cerimônia seja leve,
          consciente e abençoada.
          <br/>
          Haux! 🍃
        </h2>


        <div className="cerimonias-botao">

          <Link to="/contato">

            <button>
              Quero participar
            </button>

          </Link>

        </div>


      </section>


    </div>

  );

}


export default Cerimonias;