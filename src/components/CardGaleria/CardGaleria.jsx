import { useState, useRef } from "react";
import "./CardGaleria.css";

import imagem001 from "../../assets/imagens/001.jpg";
import imagem002 from "../../assets/imagens/002.jpg";
import imagem003 from "../../assets/imagens/003.jpg";
import imagem004 from "../../assets/imagens/004.jpg";
import imagem005 from "../../assets/imagens/005.jpg";
import imagem006 from "../../assets/imagens/006.jpg";
import imagem007 from "../../assets/imagens/007.jpg";
import imagem008 from "../../assets/imagens/008.jpg";


function CardGaleria() {

  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  const carrosselRef = useRef(null);


  const imagens = [
    imagem001,
    imagem002,
    imagem003,
    imagem004,
    imagem005,
    imagem006,
    imagem007,
    imagem008,
  ];


  function moverCarrossel(direcao) {

    if (carrosselRef.current) {

      carrosselRef.current.scrollLeft += direcao;

    }

  }


  return (
    <>

      <section className="galeria">

        <h2>Nossa Galeria</h2>


        <p>
          Um pouco da energia, da natureza e dos momentos
          vividos no Espaço Xamânico Pena Branca.
        </p>



        <div className="container-carrossel">


          <button
            className="seta esquerda"
            onClick={() => moverCarrossel(-350)}
          >
            ❮
          </button>



          <div
            className="carrossel"
            ref={carrosselRef}
          >


            {imagens.map((imagem, index) => (

              <img

                key={index}

                src={imagem}

                alt={`Foto da galeria ${index + 1}`}

                className="imagem-galeria"

                onClick={() => setImagemSelecionada(imagem)}

              />

            ))}


          </div>




          <button

            className="seta direita"

            onClick={() => moverCarrossel(350)}

          >

            ❯

          </button>



        </div>




        <div className="galeria-link">

          <a href="/galeria">

            Ver a galeria completa →

          </a>

        </div>


      </section>





      {imagemSelecionada && (

        <div

          className="modal"

          onClick={() => setImagemSelecionada(null)}

        >


          <span className="fechar">

            &times;

          </span>



          <img

            src={imagemSelecionada}

            alt="Imagem ampliada da galeria"

            className="imagem-modal"

          />


        </div>

      )}



    </>

  );

}



export default CardGaleria;