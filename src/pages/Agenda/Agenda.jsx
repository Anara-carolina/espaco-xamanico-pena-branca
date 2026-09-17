import "./Agenda.css";

import { useEffect, useState } from "react";

import {
  buscarCerimonias
} from "../../services/cerimoniaService";

import imagemRape from "../../assets/imagens/crape.jpg";
import imagemTributo from "../../assets/imagens/ctributo.jpg";
import imagemHindus from "../../assets/imagens/chindus.jpg";
import imagemCrianca from "../../assets/imagens/ccrianca.jpg";

import imagemAgosto from "../../assets/imagens/cerimoniaagosto.jpeg";
import imagemSetembro from "../../assets/imagens/cerimoniasetembro.jpeg";


function Agenda() {

  const [eventos, setEventos] = useState([]);

  const [imagemAberta, setImagemAberta] = useState(null);


  // =====================================================
  // ESCOLHER IMAGEM
  // =====================================================

  function escolherImagem(nome) {

    const imagens = {

      medicina_rape: imagemRape,

      pena_branca: imagemTributo,

      hindus: imagemHindus,

      crianca: imagemCrianca,

      cerimonia_agosto: imagemAgosto,

      cerimonia_setembro: imagemSetembro

    };

    return imagens[nome] || imagemRape;

  }


  // =====================================================
  // BUSCAR CERIMÔNIAS
  // =====================================================

  async function carregarCerimonias() {

    try {

      const dados = await buscarCerimonias();


      // =================================================
      // CERIMÔNIAS FIXAS
      // =================================================

      const eventosFixos = [

        {
          id: "setembro-2026",

          data: "19/SET",

          titulo: "Medicinas Sagradas da Floresta",

          descricao:
            "Uma experiência de conexão, cura e expansão espiritual através das medicinas sagradas da floresta.",

          imagem: "cerimonia_setembro"
        },


        {
          id: "agosto-2026",

          data: "15/AGO",

          titulo: "Mantendo as Tradições",

          descricao:
            "Uma cerimônia de conexão com as medicinas da floresta, mantendo vivas as tradições e os ensinamentos ancestrais.",

          imagem: "cerimonia_agosto"
        }

      ];


      // =================================================
      // ORDEM DA AGENDA
      // =================================================
      // Setembro primeiro
      // Agosto segundo
      // Depois as cerimônias cadastradas no Firebase
      // =================================================

      setEventos([

        ...eventosFixos,

        ...dados

      ]);

    } catch (error) {

      console.error(
        "Erro ao carregar agenda:",
        error
      );

    }

  }


  // =====================================================
  // CARREGAR AGENDA
  // =====================================================

  useEffect(() => {

    carregarCerimonias();

  }, []);


  return (

    <section className="agenda-page">


      {/* =================================================
          TÍTULO
      ================================================= */}

      <h1>
        Nossa Agenda
      </h1>


      {/* =================================================
          LISTA DE EVENTOS
      ================================================= */}

      <div className="agenda-lista">


        {eventos.map((evento) => (

          <article
            className="agenda-card"
            key={evento.id}
          >


            {/* ===========================================
                DATA
            =========================================== */}

            <div className="data-agenda">

              <strong>
                {evento.data?.split("/")[0]}
              </strong>

              <span>
                {evento.data?.split("/")[1]}
              </span>

            </div>


            {/* ===========================================
                INFORMAÇÕES
            =========================================== */}

            <div className="info-agenda">


              <div className="texto-agenda">

                <h2>
                  {evento.titulo}
                </h2>


                <p>

                  {evento.descricao ||
                    "Uma experiência de conexão, cura e expansão espiritual."
                  }

                </p>

              </div>


              {/* =========================================
                  IMAGEM
              ========================================= */}

              <img
                className="imagem-agenda"

                src={
                  escolherImagem(evento.imagem)
                }

                alt={evento.titulo}

                onClick={() =>
                  setImagemAberta(
                    escolherImagem(evento.imagem)
                  )
                }

              />


            </div>


          </article>

        ))}


      </div>


      {/* =================================================
          MODAL DA IMAGEM
      ================================================= */}

      {imagemAberta && (

        <div
          className="imagem-modal"

          onClick={() =>
            setImagemAberta(null)
          }
        >


          <button
            className="fechar-imagem"

            onClick={() =>
              setImagemAberta(null)
            }
          >

            ✕

          </button>


          <img
            src={imagemAberta}

            alt="Imagem ampliada"

            onClick={(e) =>
              e.stopPropagation()
            }
          />


        </div>

      )}


    </section>

  );

}


export default Agenda;