import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { 
  FaArrowLeft,
  FaFilePdf
} from "react-icons/fa";


import { jsPDF } from "jspdf";


import {
  buscarAnamnesePorId
} from "../../services/firebaseService";


import "./AnamneseDetalhe.css";



function AnamneseDetalhe(){


  const { id } = useParams();

  const navigate = useNavigate();


  const [ficha,setFicha] = useState(null);







  async function carregar(){


    try{


      const dados = await buscarAnamnesePorId(id);


      setFicha(dados);



    }catch(error){


      console.error(
        "Erro ao buscar ficha:",
        error
      );


    }


  }






  useEffect(()=>{


    carregar();


  },[]);









  function gerarPDF(){


    const pdf = new jsPDF();


    let y = 20;



    pdf.setFontSize(18);


    pdf.text(
      "Espaço Xamânico Pena Branca",
      20,
      y
    );



    y += 12;



    pdf.setFontSize(14);


    pdf.text(
      "Ficha de Anamnese",
      20,
      y
    );



    y += 15;



    pdf.setFontSize(11);





    const campos = [



      ["Nome", ficha.nome],

      ["CPF", ficha.cpf],

      ["Email", ficha.email],

      ["Nascimento", ficha.nascimento],

      ["Telefone", ficha.telefone],

      ["Cidade", ficha.cidade],



      ["Contato emergência", ficha.contatoEmergencia],

      ["Telefone emergência", ficha.telefoneEmergencia],

      ["Parentesco", ficha.parentesco],



      ["Pressão alta", ficha.pressao],

      ["Diabetes", ficha.diabetes],

      ["Doenças", ficha.doencas],

      ["Medicamentos", ficha.medicamentos],

      ["Alergias", ficha.alergias],



      [
        "TDAH",
        ficha.tdah ? "Sim" : "Não"
      ],


      [
        "Autismo",
        ficha.autismo ? "Sim" : "Não"
      ],



      [
        "Outra neurodivergência",
        ficha.outraNeurodivergencia
      ],



      [
        "Uso de substâncias",
        ficha.substancias
      ],



      [
        "Quais substâncias",
        ficha.substanciasQuais
      ],



      [
        "Intenção",
        ficha.intencao
      ],



      [
        "Medicinas consagradas",
        ficha.medicinasConsagradas?.join(", ")
      ],



      [
        "Outras medicinas",
        ficha.outrasMedicinas
      ],



      [
        "Experiência",
        ficha.experienciaMedicinas
      ],



      [
        "Próxima cerimônia",
        ficha.cerimoniaData
      ],



      [
        "Aceitou termos",
        ficha.aceitouTermos ? "SIM" : "NÃO"
      ]



    ];







    campos.forEach(([titulo,valor])=>{


      if(valor){



        const texto = `${titulo}: ${valor}`;



        const linhas = pdf.splitTextToSize(
          texto,
          170
        );



        pdf.text(
          linhas,
          20,
          y
        );



        y += linhas.length * 7;




        if(y > 270){


          pdf.addPage();


          y = 20;


        }


      }



    });






    pdf.save(

      `anamnese-${ficha.nome}.pdf`

    );



  }












  if(!ficha){


    return (

      <h2>
        Carregando ficha...
      </h2>

    );


  }









  return (


    <main className="anamnese-detalhe">





      <header>



        <button

          onClick={()=>navigate("/admin/anamneses")}

        >


          <FaArrowLeft/>

          Voltar


        </button>







        <h1>

          🌿 Ficha de Anamnese

        </h1>







        <button

          onClick={gerarPDF}

        >


          <FaFilePdf/>

          Gerar PDF


        </button>





      </header>









      <section>



        <h2>
          🌿 Dados pessoais
        </h2>


        <p>
          Nome: {ficha.nome}
        </p>


        <p>
          CPF: {ficha.cpf}
        </p>


        <p>
          Email: {ficha.email}
        </p>


        <p>
          Nascimento: {ficha.nascimento}
        </p>


        <p>
          Telefone: {ficha.telefone}
        </p>


        <p>
          Cidade: {ficha.cidade}
        </p>







        <h2>
          📞 Contato de emergência
        </h2>


        <p>
          Nome: {ficha.contatoEmergencia}
        </p>


        <p>
          Telefone: {ficha.telefoneEmergencia}
        </p>


        <p>
          Parentesco: {ficha.parentesco}
        </p>







        <h2>
          🤍 Saúde física
        </h2>


        <p>
          Pressão alta: {ficha.pressao}
        </p>


        <p>
          Diabetes: {ficha.diabetes}
        </p>


        <p>
          Doenças: {ficha.doencas}
        </p>


        <p>
          Medicamentos: {ficha.medicamentos}
        </p>


        <p>
          Alergias: {ficha.alergias}
        </p>







        <h2>
          🧠 Neurodivergência
        </h2>


        <p>
          TDAH: {ficha.tdah ? "Sim":"Não"}
        </p>


        <p>
          Autismo: {ficha.autismo ? "Sim":"Não"}
        </p>


        <p>
          Outra condição: {ficha.outraNeurodivergencia}
        </p>








        <h2>
          🌿 Uso de substâncias
        </h2>


        <p>
          Usa ou já usou: {ficha.substancias}
        </p>


        <p>
          Quais: {ficha.substanciasQuais}
        </p>







        <h2>
          🌙 Intenção
        </h2>


        <p>
          {ficha.intencao}
        </p>







        <h2>
          🌿 Medicinas consagradas
        </h2>


        <p>
          {ficha.medicinasConsagradas?.join(", ")}
        </p>


        <p>
          Outras: {ficha.outrasMedicinas}
        </p>


        <p>
          Experiência: {ficha.experienciaMedicinas}
        </p>







        <h2>
          🌿 Próxima cerimônia
        </h2>


        <p>
          Data: {ficha.cerimoniaData}
        </p>







        <h2>
          🙏 Consentimento
        </h2>


        <p>

          Aceitou os termos:

          {" "}

          {ficha.aceitouTermos ? "SIM" : "NÃO"}

        </p>






      </section>





    </main>


  );


}



export default AnamneseDetalhe;