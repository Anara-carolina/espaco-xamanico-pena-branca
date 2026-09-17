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



function AnamneseDetalhe() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [ficha, setFicha] = useState(null);



  /* =====================================================
     CARREGAR FICHA
  ===================================================== */

  async function carregar() {

    try {

      const dados =
        await buscarAnamnesePorId(id);

      setFicha(dados);

    } catch (error) {

      console.error(
        "Erro ao buscar ficha:",
        error
      );

    }

  }



  useEffect(() => {

    carregar();

  }, [id]);



  /* =====================================================
     VALOR DO CAMPO
  ===================================================== */

  function valorCampo(valor) {

    if (
      valor === undefined ||
      valor === null ||
      valor === ""
    ) {

      return "Não informado";

    }

    return String(valor);

  }



  /* =====================================================
     GERAR PDF
  ===================================================== */

  function gerarPDF() {

    if (!ficha) {
      return;
    }


    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });


    const larguraPagina = 210;
    const alturaPagina = 297;

    const margem = 18;

    const larguraConteudo =
      larguraPagina - margem * 2;


    let y = 20;



    /* =================================================
       CORES
    ================================================= */

    const verdeEscuro = [
      61,
      75,
      50
    ];

    const verde = [
      85,
      107,
      47
    ];

    const verdeClaro = [
      139,
      157,
      90
    ];

    const creme = [
      244,
      239,
      229
    ];

    const fundoCampo = [
      250,
      248,
      243
    ];

    const texto = [
      55,
      55,
      55
    ];

    const cinza = [
      110,
      110,
      110
    ];



    /* =================================================
       RODAPÉ
    ================================================= */

    function adicionarRodape() {

      pdf.setDrawColor(
        ...verdeClaro
      );

      pdf.setLineWidth(0.3);

      pdf.line(
        margem,
        alturaPagina - 14,
        larguraPagina - margem,
        alturaPagina - 14
      );

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(8);

      pdf.setTextColor(
        ...cinza
      );

      pdf.text(
        "Espaço Xamânico Pena Branca",
        margem,
        alturaPagina - 8
      );

      pdf.text(
        `Página ${pdf.internal.getNumberOfPages()}`,
        larguraPagina - margem,
        alturaPagina - 8,
        {
          align: "right"
        }
      );

    }



    /* =================================================
       VERIFICAR PÁGINA
    ================================================= */

    function verificarPagina(
      alturaNecessaria = 15
    ) {

      if (
        y + alturaNecessaria >
        alturaPagina - 22
      ) {

        adicionarRodape();

        pdf.addPage();

        y = 20;

      }

    }



    /* =================================================
       CABEÇALHO
    ================================================= */

    pdf.setFillColor(
      ...verdeEscuro
    );

    pdf.roundedRect(
      margem,
      12,
      larguraConteudo,
      36,
      4,
      4,
      "F"
    );


    pdf.setTextColor(
      255,
      255,
      255
    );

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(19);

    pdf.text(
      "Espaço Xamânico Pena Branca",
      larguraPagina / 2,
      27,
      {
        align: "center"
      }
    );


    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(11);

    pdf.text(
      "Ficha de Anamnese",
      larguraPagina / 2,
      36,
      {
        align: "center"
      }
    );


    pdf.setFontSize(8);

    pdf.text(
      "Documento confidencial",
      larguraPagina / 2,
      43,
      {
        align: "center"
      }
    );


    y = 57;



    /* =================================================
       IDENTIFICAÇÃO
    ================================================= */

    pdf.setFillColor(
      ...creme
    );

    pdf.roundedRect(
      margem,
      y,
      larguraConteudo,
      27,
      3,
      3,
      "F"
    );


    pdf.setTextColor(
      ...verdeEscuro
    );

    pdf.setFont(
      "helvetica",
      "bold"
    );

    pdf.setFontSize(12);

    pdf.text(
      valorCampo(
        ficha.nome ||
        ficha.nomeUsuario
      ),
      margem + 6,
      y + 9
    );


    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(9);

    pdf.setTextColor(
      ...cinza
    );


    pdf.text(
      `E-mail: ${
        ficha.email ||
        ficha.emailUsuario ||
        "Não informado"
      }`,
      margem + 6,
      y + 16
    );


    let dataEnvio =
      "Não informada";


    if (ficha.criadoEm?.toDate) {

      dataEnvio =
        ficha.criadoEm
          .toDate()
          .toLocaleDateString(
            "pt-BR"
          );

    } else if (ficha.dataEnvio) {

      dataEnvio =
        new Date(
          ficha.dataEnvio
        ).toLocaleDateString(
          "pt-BR"
        );

    }


    pdf.text(
      `Enviada em: ${dataEnvio}`,
      margem + 6,
      y + 22
    );


    y += 36;



    /* =================================================
       FUNÇÃO SEÇÃO
    ================================================= */

    function adicionarSecao(titulo) {

      verificarPagina(18);

      pdf.setFillColor(
        ...verde
      );

      pdf.roundedRect(
        margem,
        y,
        larguraConteudo,
        10,
        2,
        2,
        "F"
      );

      pdf.setTextColor(
        255,
        255,
        255
      );

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(11);

      pdf.text(
        titulo,
        margem + 5,
        y + 7
      );

      y += 15;

    }



    /* =================================================
       FUNÇÃO CAMPO
    ================================================= */

    function adicionarCampo(
      nome,
      valor
    ) {

      const resposta =
        valorCampo(valor);


      const linhas =
        pdf.splitTextToSize(
          resposta,
          larguraConteudo - 12
        );


      const altura = Math.max(
        13,
        linhas.length * 5 + 8
      );


      verificarPagina(
        altura + 4
      );


      pdf.setFillColor(
        ...fundoCampo
      );


      pdf.roundedRect(
        margem,
        y,
        larguraConteudo,
        altura,
        2,
        2,
        "F"
      );


      pdf.setTextColor(
        ...verdeEscuro
      );

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(8.5);


      pdf.text(
        nome,
        margem + 5,
        y + 5
      );


      pdf.setTextColor(
        ...texto
      );

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(9);


      pdf.text(
        linhas,
        margem + 5,
        y + 10
      );


      y += altura + 4;

    }



    /* =================================================
       DADOS PESSOAIS
    ================================================= */

    adicionarSecao(
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
      "E-mail",
      ficha.email
    );

    adicionarCampo(
      "Data de nascimento",
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



    /* =================================================
       CONTATO DE EMERGÊNCIA
    ================================================= */

    adicionarSecao(
      "Contato de emergência"
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



    /* =================================================
       SAÚDE FÍSICA
    ================================================= */

    adicionarSecao(
      "Saúde física"
    );

    adicionarCampo(
      "Pressão alta / hipertensão",
      ficha.pressao
    );

    adicionarCampo(
      "Diabetes",
      ficha.diabetes
    );

    adicionarCampo(
      "Doença cardíaca",
      ficha.problemaCardiaco
    );

    adicionarCampo(
      "Arritmia ou alteração do ritmo cardíaco",
      ficha.arritmia
    );

    adicionarCampo(
      "Epilepsia",
      ficha.epilepsia
    );

    adicionarCampo(
      "Convulsões",
      ficha.convulsoes
    );

    adicionarCampo(
      "Histórico de desmaios",
      ficha.desmaios
    );

    adicionarCampo(
      "Problemas respiratórios importantes",
      ficha.problemaRespiratorio
    );

    adicionarCampo(
      "Outras doenças ou condições de saúde",
      ficha.doencas
    );



    /* =================================================
       NEURODIVERGÊNCIAS
    ================================================= */

    adicionarSecao(
      "Neurodivergências"
    );

    /*
      TDAH e TEA são strings:
      "Sim" ou "Não".

      Não usar:
      ficha.tdah ? "Sim" : "Não"

      porque "Não" também é
      considerado verdadeiro.
    */

    adicionarCampo(
      "TDAH",
      ficha.tdah
    );

    adicionarCampo(
      "Autismo (TEA)",
      ficha.autismo
    );

    adicionarCampo(
      "Outra neurodivergência ou informação importante",
      ficha.outraNeurodivergencia
    );



    /* =================================================
       SAÚDE MENTAL
    ================================================= */

    adicionarSecao(
      "Saúde mental"
    );

    adicionarCampo(
      "Depressão",
      ficha.depressao
    );

    adicionarCampo(
      "Transtorno de ansiedade",
      ficha.ansiedade
    );

    adicionarCampo(
      "Síndrome / transtorno do pânico",
      ficha.panico
    );

    adicionarCampo(
      "TOC",
      ficha.toc
    );

    adicionarCampo(
      "Esquizofrenia ou outro transtorno psicótico",
      ficha.esquizofreniaPsicose
    );

    adicionarCampo(
      "Outra condição ou informação relacionada à saúde mental",
      ficha.outraCondicaoMental
    );



    /* =================================================
       HISTÓRICO EMOCIONAL E PSIQUIÁTRICO
    ================================================= */

    adicionarSecao(
      "Histórico emocional e psiquiátrico"
    );

    adicionarCampo(
      "Já teve crises de pânico?",
      ficha.crisePanico
    );

    adicionarCampo(
      "Já teve alucinações, delírios ou episódios de perda de contato com a realidade?",
      ficha.alucinacoes
    );

    adicionarCampo(
      "Histórico familiar de condições psiquiátricas ou neurológicas",
      ficha.historicoFamiliarPsiquiatrico
    );

    adicionarCampo(
      "Faz uso de alguma medicação atualmente?",
      ficha.usaMedicacao
    );

    if (
      ficha.usaMedicacao === "Sim"
    ) {

      adicionarCampo(
        "Se sim, qual medicação?",
        ficha.qualMedicacao
      );

    }

    adicionarCampo(
      "Estado emocional atual",
      ficha.estadoEmocional
    );

    adicionarCampo(
      "Qualidade do sono",
      ficha.qualidadeSono
    );



    /* =================================================
       USO DE SUBSTÂNCIAS
    ================================================= */

    adicionarSecao(
      "Uso de substâncias"
    );

    adicionarCampo(
      "Álcool",
      ficha.alcool
    );

    adicionarCampo(
      "Nicotina / tabaco",
      ficha.nicotina
    );

    adicionarCampo(
      "Cannabis",
      ficha.cannabis
    );

    adicionarCampo(
      "Outras substâncias psicoativas",
      ficha.outrasSubstancias
    );

    adicionarCampo(
      "Quais substâncias e com que frequência?",
      ficha.substanciasQuais
    );



    /* =================================================
       MEDICINAS
    ================================================= */

    adicionarSecao(
      "Medicinas já consagradas"
    );

    adicionarCampo(
      "Medicinas",
      Array.isArray(
        ficha.medicinasConsagradas
      )
        ? ficha.medicinasConsagradas.join(
            ", "
          )
        : ficha.medicinasConsagradas
    );

    adicionarCampo(
      "Outras medicinas",
      ficha.outrasMedicinas
    );

    adicionarCampo(
      "Experiência com as medicinas",
      ficha.experienciaMedicinas
    );

    adicionarCampo(
      "Reações ou efeitos anteriores",
      ficha.reacaoMedicinas
    );



    /* =================================================
       CERIMÔNIA E INTENÇÃO
    ================================================= */

    adicionarSecao(
      "Sua cerimônia e sua intenção"
    );

    adicionarCampo(
      "Data da cerimônia que estará participando",
      ficha.cerimoniaData
    );

    adicionarCampo(
      "Será sua primeira experiência com as medicinas da floresta?",
      ficha.primeiraVez
    );

    adicionarCampo(
      "Intenção",
      ficha.intencao
    );

    adicionarCampo(
      "Receios, medos ou preocupações",
      ficha.receios
    );



    /* =================================================
       CONSENTIMENTO
    ================================================= */

    adicionarSecao(
      "Consentimento"
    );

    adicionarCampo(
      "Aceitou os termos",
      ficha.aceitouTermos
        ? "SIM"
        : "NÃO"
    );



    /* =================================================
       RODAPÉ
    ================================================= */

    adicionarRodape();



    /* =================================================
       SALVAR
    ================================================= */

    const nomeArquivo =
      ficha.nome ||
      ficha.nomeUsuario ||
      "Participante";


    pdf.save(
      `Anamnese-${nomeArquivo}.pdf`
    );

  }



  /* =====================================================
     CARREGANDO
  ===================================================== */

  if (!ficha) {

    return (

      <main className="anamnese-detalhe">

        <h2>
          Carregando ficha...
        </h2>

      </main>

    );

  }



  /* =====================================================
     TELA
  ===================================================== */

  return (

    <main className="anamnese-detalhe">

      <header>

        <button
          onClick={() =>
            navigate(
              "/admin/anamneses"
            )
          }
        >

          <FaArrowLeft />

          Voltar

        </button>


        <h1>
           Ficha de Anamnese
        </h1>


        <button
          onClick={gerarPDF}
        >

          <FaFilePdf />

          Gerar PDF

        </button>

      </header>



      <section>

        {/* =================================================
            DADOS PESSOAIS
        ================================================= */}

        <h2>
          Dados pessoais
        </h2>

        <p>
          <strong>Nome:</strong>{" "}
          {valorCampo(ficha.nome)}
        </p>

        <p>
          <strong>CPF:</strong>{" "}
          {valorCampo(ficha.cpf)}
        </p>

        <p>
          <strong>E-mail:</strong>{" "}
          {valorCampo(ficha.email)}
        </p>

        <p>
          <strong>Data de nascimento:</strong>{" "}
          {valorCampo(ficha.nascimento)}
        </p>

        <p>
          <strong>Telefone:</strong>{" "}
          {valorCampo(ficha.telefone)}
        </p>

        <p>
          <strong>Cidade:</strong>{" "}
          {valorCampo(ficha.cidade)}
        </p>



        {/* =================================================
            CONTATO DE EMERGÊNCIA
        ================================================= */}

        <h2>
          Contato de emergência
        </h2>

        <p>
          <strong>Nome:</strong>{" "}
          {valorCampo(
            ficha.contatoEmergencia
          )}
        </p>

        <p>
          <strong>Telefone:</strong>{" "}
          {valorCampo(
            ficha.telefoneEmergencia
          )}
        </p>

        <p>
          <strong>Parentesco:</strong>{" "}
          {valorCampo(
            ficha.parentesco
          )}
        </p>



        {/* =================================================
            SAÚDE FÍSICA
        ================================================= */}

        <h2>
          Saúde física
        </h2>

        <p>
          <strong>Pressão alta / hipertensão:</strong>{" "}
          {valorCampo(ficha.pressao)}
        </p>

        <p>
          <strong>Diabetes:</strong>{" "}
          {valorCampo(ficha.diabetes)}
        </p>

        <p>
          <strong>Doença cardíaca:</strong>{" "}
          {valorCampo(
            ficha.problemaCardiaco
          )}
        </p>

        <p>
          <strong>Arritmia ou alteração do ritmo cardíaco:</strong>{" "}
          {valorCampo(
            ficha.arritmia
          )}
        </p>

        <p>
          <strong>Epilepsia:</strong>{" "}
          {valorCampo(
            ficha.epilepsia
          )}
        </p>

        <p>
          <strong>Convulsões:</strong>{" "}
          {valorCampo(
            ficha.convulsoes
          )}
        </p>

        <p>
          <strong>Histórico de desmaios:</strong>{" "}
          {valorCampo(
            ficha.desmaios
          )}
        </p>

        <p>
          <strong>Problemas respiratórios importantes:</strong>{" "}
          {valorCampo(
            ficha.problemaRespiratorio
          )}
        </p>

        <p>
          <strong>Outras doenças ou condições:</strong>{" "}
          {valorCampo(
            ficha.doencas
          )}
        </p>



        {/* =================================================
            NEURODIVERGÊNCIAS
        ================================================= */}

        <h2>
           Neurodivergências
        </h2>

        <p>
          <strong>TDAH:</strong>{" "}
          {valorCampo(ficha.tdah)}
        </p>

        <p>
          <strong>Autismo (TEA):</strong>{" "}
          {valorCampo(ficha.autismo)}
        </p>

        <p>
          <strong>Outra neurodivergência ou informação importante:</strong>{" "}
          {valorCampo(
            ficha.outraNeurodivergencia
          )}
        </p>



        {/* =================================================
            SAÚDE MENTAL
        ================================================= */}

        <h2>
           Saúde mental
        </h2>

        <p>
          <strong>Depressão:</strong>{" "}
          {valorCampo(
            ficha.depressao
          )}
        </p>

        <p>
          <strong>Transtorno de ansiedade:</strong>{" "}
          {valorCampo(
            ficha.ansiedade
          )}
        </p>

        <p>
          <strong>Síndrome / transtorno do pânico:</strong>{" "}
          {valorCampo(
            ficha.panico
          )}
        </p>

        <p>
          <strong>TOC:</strong>{" "}
          {valorCampo(
            ficha.toc
          )}
        </p>

        <p>
          <strong>Esquizofrenia ou outro transtorno psicótico:</strong>{" "}
          {valorCampo(
            ficha.esquizofreniaPsicose
          )}
        </p>

        <p>
          <strong>Outra condição:</strong>{" "}
          {valorCampo(
            ficha.outraCondicaoMental
          )}
        </p>



        {/* =================================================
            HISTÓRICO EMOCIONAL
        ================================================= */}

        <h2>
           Histórico emocional e psiquiátrico
        </h2>

        <p>
          <strong>Já teve crises de pânico?</strong>{" "}
          {valorCampo(
            ficha.crisePanico
          )}
        </p>

        <p>
          <strong>Já teve alucinações, delírios ou episódios de perda de contato com a realidade?</strong>{" "}
          {valorCampo(
            ficha.alucinacoes
          )}
        </p>

        <p>
          <strong>Histórico familiar:</strong>{" "}
          {valorCampo(
            ficha.historicoFamiliarPsiquiatrico
          )}
        </p>

        <p>
          <strong>Faz uso de alguma medicação atualmente?</strong>{" "}
          {valorCampo(
            ficha.usaMedicacao
          )}
        </p>

        {ficha.usaMedicacao === "Sim" && (

          <p>
            <strong>Qual medicação?</strong>{" "}
            {valorCampo(
              ficha.qualMedicacao
            )}
          </p>

        )}

        <p>
          <strong>Estado emocional atual:</strong>{" "}
          {valorCampo(
            ficha.estadoEmocional
          )}
        </p>

        <p>
          <strong>Qualidade do sono:</strong>{" "}
          {valorCampo(
            ficha.qualidadeSono
          )}
        </p>



        {/* =================================================
            SUBSTÂNCIAS
        ================================================= */}

        <h2>
          Uso de substâncias
        </h2>

        <p>
          <strong>Álcool:</strong>{" "}
          {valorCampo(
            ficha.alcool
          )}
        </p>

        <p>
          <strong>Nicotina / tabaco:</strong>{" "}
          {valorCampo(
            ficha.nicotina
          )}
        </p>

        <p>
          <strong>Cannabis:</strong>{" "}
          {valorCampo(
            ficha.cannabis
          )}
        </p>

        <p>
          <strong>Outras substâncias psicoativas:</strong>{" "}
          {valorCampo(
            ficha.outrasSubstancias
          )}
        </p>

        <p>
          <strong>Quais substâncias e com que frequência?</strong>{" "}
          {valorCampo(
            ficha.substanciasQuais
          )}
        </p>



        {/* =================================================
            MEDICINAS
        ================================================= */}

        <h2>
          Medicinas já consagradas
        </h2>

        <p>
          <strong>Medicinas:</strong>{" "}
          {
            Array.isArray(
              ficha.medicinasConsagradas
            )
              ? ficha.medicinasConsagradas.join(
                  ", "
                )
              : valorCampo(
                  ficha.medicinasConsagradas
                )
          }
        </p>

        <p>
          <strong>Outras medicinas:</strong>{" "}
          {valorCampo(
            ficha.outrasMedicinas
          )}
        </p>

        <p>
          <strong>Experiência com as medicinas:</strong>{" "}
          {valorCampo(
            ficha.experienciaMedicinas
          )}
        </p>

        <p>
          <strong>Reações ou efeitos anteriores:</strong>{" "}
          {valorCampo(
            ficha.reacaoMedicinas
          )}
        </p>



        {/* =================================================
            CERIMÔNIA
        ================================================= */}

        <h2>
          Sua cerimônia e sua intenção
        </h2>

        <p>
          <strong>Data da cerimônia:</strong>{" "}
          {valorCampo(
            ficha.cerimoniaData
          )}
        </p>

        <p>
          <strong>Primeira experiência com as medicinas da floresta:</strong>{" "}
          {valorCampo(
            ficha.primeiraVez
          )}
        </p>

        <p>
          <strong>Intenção:</strong>
        </p>

        <p>
          {valorCampo(
            ficha.intencao
          )}
        </p>

        <p>
          <strong>Receios, medos ou preocupações:</strong>
        </p>

        <p>
          {valorCampo(
            ficha.receios
          )}
        </p>



        {/* =================================================
            CONSENTIMENTO
        ================================================= */}

        <h2>
          🙏 Consentimento
        </h2>

        <p>
          <strong>Aceitou os termos:</strong>{" "}

          {ficha.aceitouTermos
            ? "SIM"
            : "NÃO"
          }

        </p>

      </section>

    </main>

  );

}



export default AnamneseDetalhe;