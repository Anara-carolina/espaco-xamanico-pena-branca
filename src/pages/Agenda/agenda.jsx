import "./Agenda.css";

import imagemRape from "../../assets/imagens/crape.jpg";
import imagemTributo from "../../assets/imagens/ctributo.jpg";
import imagemHindus from "../../assets/imagens/chindus.jpg";


function Agenda() {


  const eventos = [


    {
      dia: "06",
      mes: "MAI",
      titulo: "Roda de Rapé com os povos originários HUNI KUIN",
      imagem: imagemRape
    },


    {
      dia: "13",
      mes: "JUN",
      titulo: "Tributo ao Pena Branca e aniversário de dois anos de casa",
      imagem: imagemTributo
    },


    {
      dia: "11",
      mes: "JUL",
      titulo: "Na força dos Deuses Hindus",
      imagem: imagemHindus
    }


  ];




  return (


    <section className="agenda-page">


      <h1>
        Nossa Agenda
      </h1>




      <div className="agenda-lista">



        {eventos.map((evento, index) => (



          <div 
            className="agenda-card" 
            key={index}
          >



            <div className="data-agenda">


              <strong>
                {evento.dia}
              </strong>


              <span>
                {evento.mes}
              </span>


            </div>





            <div className="info-agenda">



              <div className="texto-agenda">


                <h2>
                  {evento.titulo}
                </h2>


              </div>





              <img

                src={evento.imagem}

                alt={evento.titulo}

              />



            </div>



          </div>



        ))}



      </div>



    </section>


  );

}


export default Agenda;