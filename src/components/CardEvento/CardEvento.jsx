
import { useState } from "react";
import "./CardEvento.css";

import imagemRape from "../../assets/imagens/crape.jpg";
import imagemTributo from "../../assets/imagens/ctributo.jpg";
import imagemHindus from "../../assets/imagens/chindus.jpg";

import imagemAgosto from "../../assets/imagens/cerimoniaagosto.jpeg";
import imagemSetembro from "../../assets/imagens/cerimoniasetembro.jpeg";


function CardEvento() {

  const [imagemSelecionada, setImagemSelecionada] = useState(null);


  const eventos = [

    {
      dia: "06",
      mes: "MAI",
      titulo: "Roda de Rapé com os povos originários HUNI KUIN",
      imagem: imagemRape,
    },

    {
      dia: "13",
      mes: "JUN",
      titulo: "Tributo ao Pena Branca e aniversário de dois anos de casa",
      imagem: imagemTributo,
    },

    {
      dia: "11",
      mes: "JUL",
      titulo: "Na força dos Deuses Hindus",
      imagem: imagemHindus,
    },

    {
      dia: "15",
      mes: "AGO",
      titulo: "Mantendo as Tradições",
      imagem: imagemAgosto,
    },

    {
      dia: "19",
      mes: "SET",
      titulo: "Medicinas Sagradas da Floresta",
      imagem: imagemSetembro,
    },

  ];


  return (

    <>

      <section className="eventos">

        <h2>
          Nossa Agenda
        </h2>


        {eventos.map((evento, index) => (

          <div
            className="evento-card"
            key={index}
          >

            <div className="data-evento">

              <strong>
                {evento.dia}
              </strong>

              <span>
                {evento.mes}
              </span>

            </div>


            <div className="evento-info">

              <div className="texto-evento">

                <h3>
                  {evento.titulo}
                </h3>

              </div>


              <img
                src={evento.imagem}
                alt={evento.titulo}
                onClick={() =>
                  setImagemSelecionada(evento.imagem)
                }
                className="imagem-evento"
              />

            </div>

          </div>

        ))}


        {/* =================================================
            LINK PARA A AGENDA COMPLETA
        ================================================= */}

        <div className="agenda-link">

          <a href="/agenda">
            Ver agenda completa →
          </a>

        </div>

      </section>


      {/* =================================================
          MODAL DA IMAGEM
      ================================================= */}

      {imagemSelecionada && (

        <div
          className="modal"
          onClick={() =>
            setImagemSelecionada(null)
          }
        >

          <span className="fechar">
            &times;
          </span>


          <img
            src={imagemSelecionada}
            alt="Cerimônia"
            className="imagem-modal"
          />

        </div>

      )}

    </>

  );

}


export default CardEvento;

