import "./Agenda.css";

import { useEffect, useState } from "react";

import {
  buscarCerimonias
} from "../../services/cerimoniaService";

import imagemRape from "../../assets/imagens/crape.jpg";
import imagemTributo from "../../assets/imagens/ctributo.jpg";
import imagemHindus from "../../assets/imagens/chindus.jpg";
import imagemCrianca from "../../assets/imagens/ccrianca.jpg";



function Agenda() {


  const [eventos, setEventos] = useState([]);

  const [imagemAberta, setImagemAberta] = useState(null);





  // ==========================
  // ESCOLHER IMAGEM
  // ==========================

  function escolherImagem(nome) {


    const imagens = {


      medicina_rape: imagemRape,

      pena_branca: imagemTributo,

      hindus: imagemHindus,

      crianca: imagemCrianca


    };


    return imagens[nome] || imagemRape;


  }







  // ==========================
  // BUSCAR CERIMÔNIAS
  // ==========================

  async function carregarCerimonias() {


    try {


      const dados = await buscarCerimonias();


      setEventos(dados);



    } catch(error) {


      console.error(

        "Erro ao carregar agenda:",

        error

      );


    }


  }






  useEffect(() => {


    carregarCerimonias();


  }, []);








  return (


    <section className="agenda-page">



      <h1>

        Nossa Agenda

      </h1>








      <div className="agenda-lista">






        {eventos.map((evento) => (




          <article

            className="agenda-card"

            key={evento.id}

          >





            <div className="data-agenda">



              <strong>

                {evento.data?.split("/")[0]}

              </strong>



              <span>

                {evento.data?.split("/")[1]}

              </span>



            </div>









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









      {
        imagemAberta && (



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



        )
      }







    </section>


  );


}



export default Agenda;