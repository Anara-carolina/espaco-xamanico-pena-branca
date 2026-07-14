import { useState } from "react";
import "./CardEvento.css";

import imagemRape from "../../assets/imagens/crape.jpg";
import imagemTributo from "../../assets/imagens/ctributo.jpg";
import imagemHindus from "../../assets/imagens/chindus.jpg";

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
  ];

  return (
    <>
      <section className="eventos">
        <h2>Nossa Agenda</h2>

        {eventos.map((evento, index) => (
          <div className="evento-card" key={index}>
            <div className="data-evento">
              <strong>{evento.dia}</strong>
              <span>{evento.mes}</span>
            </div>

            <div className="evento-info">
              <div className="texto-evento">
                <h3>{evento.titulo}</h3>
              </div>

              <img
                src={evento.imagem}
                alt={evento.titulo}
                onClick={() => setImagemSelecionada(evento.imagem)}
                className="imagem-evento"
              />
            </div>
          </div>
        ))}

        {/* Link para a página da agenda */}
        <div className="agenda-link">
          <a href="/agenda">Ver agenda completa →</a>
        </div>
      </section>

      {/* Modal da imagem */}
      {imagemSelecionada && (
        <div
          className="modal"
          onClick={() => setImagemSelecionada(null)}
        >
          <span className="fechar">&times;</span>

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