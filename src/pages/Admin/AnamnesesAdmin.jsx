import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaFilePdf,
  FaEye
} from "react-icons/fa";


import jsPDF from "jspdf";


import {
  buscarAnamneses,
  buscarAnamnesePorId
} from "../../services/firebaseService";


import "./AnamnesesAdmin.css";





function AnamnesesAdmin(){


  const navigate = useNavigate();


  const [anamneses,setAnamneses] = useState([]);







  async function carregar(){


    try{


      const dados = await buscarAnamneses();


      setAnamneses(dados);



    }catch(error){


      console.error(
        "Erro ao carregar anamneses:",
        error
      );


    }


  }









  useEffect(()=>{


    carregar();


  },[]);









  function formatarData(timestamp){


    if(!timestamp) return "Sem data";


    if(timestamp.toDate){


      return timestamp
      .toDate()
      .toLocaleDateString("pt-BR");


    }


    return "Sem data";


  }













  async function gerarPDF(id){



    try{



      const ficha = await buscarAnamnesePorId(id);



      if(!ficha){

        alert(
          "Ficha não encontrada"
        );

        return;

      }







      const pdf = new jsPDF();





      let y = 20;





      function adicionarTitulo(texto){


        pdf.setFontSize(14);

        pdf.text(
          texto,
          15,
          y
        );


        y += 10;


      }







      function adicionarCampo(nome,valor){



        pdf.setFontSize(10);



        const texto = `${nome}: ${valor || "Não informado"}`;



        const linhas = pdf.splitTextToSize(
          texto,
          180
        );



        pdf.text(
          linhas,
          15,
          y
        );



        y += linhas.length * 6;




        if(y > 280){


          pdf.addPage();


          y = 20;


        }



      }









      pdf.setFontSize(18);


      pdf.text(

        "Espaço Xamânico Pena Branca",

        15,

        y

      );



      y += 10;



      pdf.setFontSize(14);


      pdf.text(

        "Ficha de Anamnese",

        15,

        y

      );



      y += 15;









      adicionarTitulo(
        "Dados pessoais"
      );


      adicionarCampo(
        "Nome",
        ficha.nome
      );


      adicionarCampo(
        "CPF",
        ficha.cpf
      );


      adicionarCampo(
        "Email",
        ficha.email
      );


      adicionarCampo(
        "Nascimento",
        ficha.nascimento
      );


      adicionarCampo(
        "Telefone",
        ficha.telefone
      );


      adicionarCampo(
        "Cidade",
        ficha.cidade
      );









      adicionarTitulo(
        "Contato emergência"
      );


      adicionarCampo(
        "Nome",
        ficha.contatoEmergencia
      );


      adicionarCampo(
        "Telefone",
        ficha.telefoneEmergencia
      );


      adicionarCampo(
        "Parentesco",
        ficha.parentesco
      );









      adicionarTitulo(
        "Saúde física"
      );


      adicionarCampo(
        "Pressão alta",
        ficha.pressao
      );


      adicionarCampo(
        "Diabetes",
        ficha.diabetes
      );


      adicionarCampo(
        "Doenças",
        ficha.doencas
      );


      adicionarCampo(
        "Medicamentos",
        ficha.medicamentos
      );


      adicionarCampo(
        "Alergias",
        ficha.alergias
      );









      adicionarTitulo(
        "Neurodivergência"
      );


      adicionarCampo(
        "TDAH",
        ficha.tdah ? "Sim" : "Não"
      );


      adicionarCampo(
        "Autismo",
        ficha.autismo ? "Sim" : "Não"
      );


      adicionarCampo(
        "Outra condição",
        ficha.outraNeurodivergencia
      );









      adicionarTitulo(
        "Uso de substâncias"
      );


      adicionarCampo(
        "Usa ou já usou",
        ficha.substancias
      );


      adicionarCampo(
        "Quais",
        ficha.substanciasQuais
      );









      adicionarTitulo(
        "Intenção"
      );


      adicionarCampo(
        "Intenção",
        ficha.intencao
      );









      adicionarTitulo(
        "Medicinas consagradas"
      );


      adicionarCampo(
        "Medicinas",
        ficha.medicinasConsagradas?.join(", ")
      );


      adicionarCampo(
        "Outras",
        ficha.outrasMedicinas
      );


      adicionarCampo(
        "Experiência",
        ficha.experienciaMedicinas
      );









      adicionarTitulo(
        "Próxima cerimônia"
      );


      adicionarCampo(
        "Data",
        ficha.cerimoniaData
      );









      adicionarTitulo(
        "Consentimento"
      );


      adicionarCampo(
        "Aceitou termos",
        ficha.aceitouTermos
        ? "SIM"
        : "NÃO"
      );






      pdf.save(

        `Anamnese-${ficha.nome}.pdf`

      );



    }catch(error){


      console.error(
        "Erro ao gerar PDF:",
        error
      );


      alert(
        "Erro ao gerar PDF"
      );


    }


  }












  return (



    <main className="anamneses-admin">





      <header className="admin-topo">



        <button

          className="btn-voltar-admin"

          onClick={()=>navigate("/admin/dashboard")}

        >

          <FaArrowLeft/>

          Voltar


        </button>






        <h1>

          🌿 Fichas de Anamnese

        </h1>





      </header>









      <section className="lista-anamneses">





        {anamneses.length === 0 && (

          <p>
            Nenhuma ficha encontrada.
          </p>

        )}









        {anamneses.map((item)=>(



          <article

            className="card-anamnese"

            key={item.id}

          >



            <h2>

              {item.nome || item.nomeUsuario}

            </h2>




            <p>

              📧 {item.email || item.emailUsuario}

            </p>




            <span>

              Enviada em:

              {" "}

              {formatarData(item.criadoEm)}

            </span>







            <div className="acoes-anamnese">





              <button

                onClick={()=>navigate(
                  `/admin/anamnese/${item.id}`
                )}

              >

                <FaEye/>

                Ver ficha


              </button>







              <button

                onClick={()=>gerarPDF(item.id)}

              >

                <FaFilePdf/>

                PDF


              </button>







            </div>





          </article>



        ))}





      </section>







    </main>


  );


}



export default AnamnesesAdmin;