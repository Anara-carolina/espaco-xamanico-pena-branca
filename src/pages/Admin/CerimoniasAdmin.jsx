import imagemRape from "../../assets/imagens/crape.jpg";
import imagemTributo from "../../assets/imagens/ctributo.jpg";
import imagemHindus from "../../assets/imagens/chindus.jpg";
import imagemCrianca from "../../assets/imagens/ccrianca.jpg";

import { useEffect, useState } from "react";

import {
  FaImage,
  FaTrash,
  FaEdit,
  FaPlus
} from "react-icons/fa";


import {
  buscarCerimonias,
  removerCerimonia
} from "../../services/cerimoniaService";


import CerimoniaModal from "./CerimoniaModal";

import TrocarImagemModal from "./TrocarImagemModal";


import "./CerimoniasAdmin.css";





function CerimoniasAdmin() {



  const [cerimonias, setCerimonias] = useState([]);

  const [abrirModal, setAbrirModal] = useState(false);

  const [cerimoniaEditar, setCerimoniaEditar] = useState(null);

  const [abrirTrocarImagem, setAbrirTrocarImagem] = useState(false);

  const [cerimoniaImagem, setCerimoniaImagem] = useState(null);







  // ============================
  // ESCOLHER IMAGEM
  // ============================


  function escolherImagem(nome) {


    const imagens = {


      medicina_rape: imagemRape,

      pena_branca: imagemTributo,

      hindus: imagemHindus,

      crianca: imagemCrianca


    };


    return imagens[nome] || imagemRape;


  }








  // ============================
  // BUSCAR
  // ============================


  async function carregarCerimonias() {


    try {


      const dados = await buscarCerimonias();


      setCerimonias(dados);



    } catch(error) {


      console.error(
        "Erro ao buscar cerimônias:",
        error
      );


    }


  }








  useEffect(() => {


    carregarCerimonias();


  }, []);









  // ============================
  // NOVA
  // ============================


  function novaCerimonia() {


    setCerimoniaEditar(null);

    setAbrirModal(true);


  }









  // ============================
  // EXCLUIR
  // ============================


  async function excluir(id) {


    const confirmar = window.confirm(
      "Deseja realmente excluir esta cerimônia?"
    );


    if(!confirmar) return;



    try {


      await removerCerimonia(id);


      carregarCerimonias();



    } catch(error) {


      console.error(
        "Erro ao excluir:",
        error
      );


    }


  }









  // ============================
  // EDITAR
  // ============================


  function editar(item) {


    setCerimoniaEditar(item);

    setAbrirModal(true);


  }









  // ============================
  // TROCAR IMAGEM
  // ============================


  function trocarFoto(item) {


    setCerimoniaImagem(item);

    setAbrirTrocarImagem(true);


  }









  return (



    <div className="cerimonias-admin">







      <header className="admin-topo">



        <h1>

          🌿 Gerenciar Cerimônias

        </h1>





        <button

          className="btn-add"

          onClick={novaCerimonia}

        >


          <FaPlus />

          Nova Cerimônia


        </button>





      </header>









      <section className="cerimonias-grid">





        {cerimonias.map((item)=>(



          <div

            className="cerimonia-card"

            key={item.id}

          >






            <img

              src={escolherImagem(item.imagem)}

              alt={item.titulo}

            />








            <div className="card-info">





              <h2>

                {item.titulo}

              </h2>






              <span>

                {item.data}

              </span>







              <p>

                {item.descricao}

              </p>








              <div className="acoes">





                <button

                  onClick={() => trocarFoto(item)}

                >


                  <FaImage />

                  Trocar Foto


                </button>








                <button

                  onClick={() => editar(item)}

                >


                  <FaEdit />

                  Editar


                </button>








                <button

                  className="delete"

                  onClick={() => excluir(item.id)}

                >


                  <FaTrash />

                  Excluir


                </button>






              </div>







            </div>







          </div>



        ))}







      </section>









      {abrirModal && (



        <CerimoniaModal



          fechar={() => {


            setAbrirModal(false);

            setCerimoniaEditar(null);


          }}



          atualizar={carregarCerimonias}



          dadosEditar={cerimoniaEditar}



        />



      )}









      {abrirTrocarImagem && (



        <TrocarImagemModal



          fechar={() => {


            setAbrirTrocarImagem(false);

            setCerimoniaImagem(null);


          }}



          cerimonia={cerimoniaImagem}



          atualizar={carregarCerimonias}



        />



      )}








    </div>



  );


}




export default CerimoniasAdmin;