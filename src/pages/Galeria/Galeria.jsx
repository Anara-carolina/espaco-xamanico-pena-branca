import { useState } from "react";
import "./Galeria.css";


import imagem001 from "../../assets/imagens/001.jpg";
import imagem002 from "../../assets/imagens/002.jpg";
import imagem003 from "../../assets/imagens/003.jpg";
import imagem004 from "../../assets/imagens/004.jpg";
import imagem005 from "../../assets/imagens/005.jpg";
import imagem006 from "../../assets/imagens/006.jpg";
import imagem007 from "../../assets/imagens/007.jpg";
import imagem008 from "../../assets/imagens/008.jpg";
import imagem009 from "../../assets/imagens/009.jpg";
import imagem010 from "../../assets/imagens/010.jpg";
import imagem011 from "../../assets/imagens/011.jpg";
import imagem012 from "../../assets/imagens/012.jpg";
import imagem013 from "../../assets/imagens/013.jpg";
import imagem014 from "../../assets/imagens/014.jpg";
import imagem015 from "../../assets/imagens/015.jpg";
import imagem016 from "../../assets/imagens/016.jpg";
import imagem017 from "../../assets/imagens/017.jpg";
import imagem018 from "../../assets/imagens/018.jpg";
import imagem019 from "../../assets/imagens/019.jpg";
import imagem020 from "../../assets/imagens/020.jpg";
import imagem021 from "../../assets/imagens/021.jpg";
import imagem022 from "../../assets/imagens/022.jpg";
import imagem023 from "../../assets/imagens/023.jpg";
import imagem024 from "../../assets/imagens/024.jpg";
import imagem025 from "../../assets/imagens/025.jpg";
import imagem026 from "../../assets/imagens/026.jpg";
import imagem027 from "../../assets/imagens/027.jpg";
import imagem028 from "../../assets/imagens/028.jpg";
import imagem029 from "../../assets/imagens/029.jpg";
import imagem030 from "../../assets/imagens/030.jpg";
import imagem031 from "../../assets/imagens/031.jpg";
import imagem032 from "../../assets/imagens/032.jpg";
import imagem033 from "../../assets/imagens/033.jpg";
import imagem034 from "../../assets/imagens/034.jpg";
import imagem035 from "../../assets/imagens/035.jpg";
import imagem036 from "../../assets/imagens/036.jpg";
import imagem037 from "../../assets/imagens/037.jpg";
import imagem038 from "../../assets/imagens/038.jpg";



function Galeria() {


  const [imagemSelecionada, setImagemSelecionada] = useState(null);



  const imagens = [

    imagem001, imagem002, imagem003, imagem004,
    imagem005, imagem006, imagem007, imagem008,
    imagem009, imagem010, imagem011, imagem012,
    imagem013, imagem014, imagem015, imagem016,
    imagem017, imagem018, imagem019, imagem020,
    imagem021, imagem022, imagem023, imagem024,
    imagem025, imagem026, imagem027, imagem028,
    imagem029, imagem030, imagem031, imagem032,
    imagem033, imagem034, imagem035, imagem036,
    imagem037, imagem038

  ];




  return (

    <main className="pagina-galeria">



      <section className="titulo-galeria">


        <h1>
          Nossa Galeria
        </h1>


        <p>
          Momentos, encontros e experiências vividas
          no Espaço Xamânico Pena Branca.
        </p>


      </section>






      <section className="galeria-grid">


        {imagens.map((imagem,index)=>(


          <img

            key={index}

            src={imagem}

            alt={`Momento da galeria ${index + 1}`}

            onClick={() => setImagemSelecionada(imagem)}

          />


        ))}



      </section>







      {imagemSelecionada && (


        <div

          className="modal-galeria"

          onClick={() => setImagemSelecionada(null)}

        >


          <button className="fechar-galeria">

            ×

          </button>



          <img

            src={imagemSelecionada}

            alt="Imagem ampliada"

          />


        </div>


      )}



    </main>


  );

}



export default Galeria;