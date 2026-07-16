import { useState } from "react";

import {
  FaCheck,
  FaTimes
} from "react-icons/fa";

import {
  atualizarImagemCerimonia
} from "../../services/cerimoniaService";

import imagemRape from "../../assets/imagens/crape.jpg";
import imagemTributo from "../../assets/imagens/ctributo.jpg";
import imagemHindus from "../../assets/imagens/chindus.jpg";
import imagemCrianca from "../../assets/imagens/ccrianca.jpg";

import "./TrocarImagemModal.css";


function TrocarImagemModal({
  fechar,
  atualizar,
  cerimonia
}) {


  const [imagem, setImagem] = useState(
    cerimonia.imagem
  );



  const imagens = [

    {
      nome:"medicina_rape",
      titulo:"Medicina do Rapé",
      foto:imagemRape
    },

    {
      nome:"pena_branca",
      titulo:"Pena Branca",
      foto:imagemTributo
    },

    {
      nome:"hindus",
      titulo:"Hindus",
      foto:imagemHindus
    },

    {
      nome:"crianca",
      titulo:"Criança Interior",
      foto:imagemCrianca
    }

  ];




  async function salvar(){


    await atualizarImagemCerimonia(

      cerimonia.id,

      imagem

    );


    alert(
      "Imagem alterada com sucesso 🌿"
    );


    atualizar();

    fechar();


  }





  return (

    <div className="trocar-modal-fundo">


      <div className="trocar-modal">


        <h2>
          Trocar Imagem
        </h2>


        <p>
          {cerimonia.titulo}
        </p>



        <div className="imagens-opcoes">


          {imagens.map((item)=>(


            <div

              key={item.nome}

              className={
                imagem === item.nome
                ? "imagem-selecionada"
                : ""
              }

              onClick={() =>
                setImagem(item.nome)
              }

            >


              <img

                src={item.foto}

                alt={item.titulo}

              />


              <span>
                {item.titulo}
              </span>


              {
                imagem === item.nome &&
                <FaCheck />
              }


            </div>


          ))}



        </div>




        <div className="trocar-botoes">


          <button

            onClick={fechar}

          >

            <FaTimes/>

            Cancelar

          </button>



          <button

            onClick={salvar}

          >

            <FaCheck/>

            Salvar

          </button>



        </div>



      </div>



    </div>

  );


}


export default TrocarImagemModal;