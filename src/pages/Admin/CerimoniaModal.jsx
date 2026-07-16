import { useState } from "react";

import {
  salvarCerimonia,
  atualizarCerimonia
} from "../../services/cerimoniaService";

import "./CerimoniaModal.css";


function CerimoniaModal({ fechar, atualizar, dadosEditar }) {



  const [titulo, setTitulo] = useState(
    dadosEditar?.titulo || ""
  );


  const [data, setData] = useState(
    dadosEditar?.data || ""
  );


  const [descricao, setDescricao] = useState(
    dadosEditar?.descricao || ""
  );


  const [imagem, setImagem] = useState(
    dadosEditar?.imagem || "medicina_rape"
  );







  async function salvar(e) {


    e.preventDefault();



    try {



      const dados = {


        titulo,

        data,

        descricao,

        imagem


      };






      // SE EXISTIR ID = EDITAR

      if(dadosEditar){


        await atualizarCerimonia(

          dadosEditar.id,

          dados

        );


        alert(
          "Cerimônia atualizada com sucesso! 🌿"
        );



      } else {



        // NOVA CERIMÔNIA

        await salvarCerimonia(dados);



        alert(
          "Cerimônia cadastrada com sucesso! 🌿"
        );


      }






      atualizar();


      fechar();





    } catch(error) {


      console.error(error);


      alert(
        "Erro ao salvar cerimônia."
      );


    }



  }









  return (



    <div className="cerimonia-modal-fundo">





      <div className="cerimonia-modal">






        <h2>


          {dadosEditar

            ? "🌿 Editar Cerimônia"

            : "🌿 Nova Cerimônia"

          }


        </h2>









        <form onSubmit={salvar}>






          <label>

            Título da Cerimônia

          </label>




          <input


            type="text"


            placeholder="Digite o título"


            value={titulo}


            onChange={(e)=>setTitulo(e.target.value)}


            required


          />









          <label>

            Data da Cerimônia

          </label>





          <input


            type="text"


            placeholder="Ex: 13 de Junho"


            value={data}


            onChange={(e)=>setData(e.target.value)}


            required


          />









          <label>

            Descrição

          </label>







          <textarea


            placeholder="Digite a descrição da cerimônia"


            value={descricao}


            onChange={(e)=>setDescricao(e.target.value)}


            required


          />









          <label>

            Imagem

          </label>








          <select


            value={imagem}


            onChange={(e)=>setImagem(e.target.value)}


          >





            <option value="medicina_rape">

              Medicina do Rapé

            </option>





            <option value="pena_branca">

              Pena Branca

            </option>





            <option value="hindus">

              Hindus

            </option>





            <option value="crianca">

              Criança Interior

            </option>






          </select>









          <div className="cerimonia-modal-botoes">







            <button


              type="button"


              className="cerimonia-btn-cancelar"


              onClick={fechar}


            >


              Cancelar


            </button>










            <button


              type="submit"


              className="cerimonia-btn-salvar"


            >


              {dadosEditar

                ? "Atualizar"

                : "Salvar"

              }


            </button>







          </div>







        </form>






      </div>







    </div>




  );



}


export default CerimoniaModal;