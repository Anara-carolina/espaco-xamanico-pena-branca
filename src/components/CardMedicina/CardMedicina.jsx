import "./CardMedicina.css";

import ayahuasca from "../../assets/imagens/ayahuasca.jpg";
import rapeImagem from "../../assets/imagens/rape-sagrado.jpg";
import sananga from "../../assets/imagens/sananga.jpg";
import kambo from "../../assets/imagens/kambo.jpg";


function Medicinas() {


  const medicinas = [

    {
      nome: "Medicina da Ayahuasca",
      imagem: ayahuasca,
      descricao:
        "Uma medicina ancestral de conexão, presença e autoconhecimento."
    },


    {
      nome: "Medicina do Rapé",
      imagem: rapeImagem,
      descricao:
        "Um sopro sagrado de conexão, limpeza e fortalecimento da presença."
    },


    {
      nome: "Medicina da Sananga",
      imagem: sananga,
      descricao:
        "Uma tradição amazônica associada ao foco, presença e percepção."
    },


    {
      nome: "Kambô",
      imagem: kambo,
      descricao:
        "Uma medicina tradicional da floresta recebida com respeito e intenção."
    }

  ];



  return (

    <section className="medicinas">


      <h2>
        Medicinas da Floresta
      </h2>



      <p className="texto-medicinas">

        Saberes ancestrais recebidos com respeito,
        amor e conexão com a natureza.

      </p>




      <div className="cards-medicinas">


        {medicinas.map((medicina, index) => (


          <div
            className="card-medicina"
            key={index}
          >



            <img

              src={medicina.imagem}

              alt={medicina.nome}

            />



            <div className="conteudo-medicina">



              <h3>
                {medicina.nome}
              </h3>



              <p>
                {medicina.descricao}
              </p>



              <a href={`/medicinas/${medicina.nome.toLowerCase()}`}>

                Conheça →

              </a>



            </div>



          </div>


        ))}



      </div>



    </section>

  );

}



export default Medicinas;