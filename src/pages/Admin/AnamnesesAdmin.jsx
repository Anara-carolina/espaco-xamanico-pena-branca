
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaFilePdf,
  FaEye,
  FaTrash,
  FaSearch,
  FaCalendarAlt,
  FaTimes
} from "react-icons/fa";

import jsPDF from "jspdf";

import {
  buscarAnamneses,
  buscarAnamnesePorId,
  excluirAnamnese
} from "../../services/firebaseService";

import "./AnamnesesAdmin.css";


function AnamnesesAdmin() {

  const navigate = useNavigate();

  const [anamneses, setAnamneses] = useState([]);

  /*
   =====================================================
   FILTROS
  =====================================================
  */

  const [filtroNome, setFiltroNome] = useState("");

  const [filtroData, setFiltroData] = useState("");

  const [filtroDataInicio, setFiltroDataInicio] =
    useState("");

  const [filtroDataFim, setFiltroDataFim] =
    useState("");


  /*
   =====================================================
   CARREGAR ANAMNESES
  =====================================================
  */

  async function carregar() {

    try {

      const dados = await buscarAnamneses();

      setAnamneses(dados);

    } catch (error) {

      console.error(
        "Erro ao carregar anamneses:",
        error
      );

    }

  }


  useEffect(() => {

    carregar();

  }, []);


  /*
   =====================================================
   FORMATAR DATA
  =====================================================
  */

  function formatarData(timestamp) {

    if (!timestamp) {
      return "Sem data";
    }

    if (timestamp.toDate) {

      return timestamp
        .toDate()
        .toLocaleDateString("pt-BR");

    }

    return "Sem data";

  }


  /*
   =====================================================
   OBTER DATA REAL DA FICHA
  =====================================================
  */

  function obterData(timestamp) {

    if (!timestamp) {
      return null;
    }

    if (
      timestamp &&
      typeof timestamp.toDate === "function"
    ) {

      return timestamp.toDate();

    }

    if (timestamp instanceof Date) {

      return timestamp;

    }

    return null;

  }


  /*
   =====================================================
   NORMALIZAR TEXTO
  =====================================================
   Remove acentos e deixa tudo minúsculo.
  */

  function normalizarTexto(texto) {

    return String(texto || "")
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .toLowerCase()
      .trim();

  }


  /*
   =====================================================
   VERIFICAR DATA DOS FILTROS
  =====================================================
  */

  function dataDentroDosFiltros(data) {

    if (!data) {
      return false;
    }


    /*
     FILTRO POR DATA ESPECÍFICA
    */

    if (filtroData) {

      const dataFiltro =
        new Date(
          `${filtroData}T00:00:00`
        );

      const mesmaData =
        data.getFullYear() ===
          dataFiltro.getFullYear() &&

        data.getMonth() ===
          dataFiltro.getMonth() &&

        data.getDate() ===
          dataFiltro.getDate();


      if (!mesmaData) {

        return false;

      }

    }


    /*
     FILTRO DATA INICIAL
    */

    if (filtroDataInicio) {

      const dataInicio =
        new Date(
          `${filtroDataInicio}T00:00:00`
        );

      dataInicio.setHours(
        0,
        0,
        0,
        0
      );


      if (data < dataInicio) {

        return false;

      }

    }


    /*
     FILTRO DATA FINAL

     Inclui o dia inteiro.
    */

    if (filtroDataFim) {

      const dataFim =
        new Date(
          `${filtroDataFim}T23:59:59.999`
        );


      if (data > dataFim) {

        return false;

      }

    }


    return true;

  }


  /*
   =====================================================
   FILTRAR ANAMNESES
  =====================================================
  */

  const anamnesesFiltradas =
    anamneses.filter((item) => {

      const nome =
        item.nome ||
        item.nomeUsuario ||
        "";


      const nomeNormalizado =
        normalizarTexto(nome);


      const buscaNormalizada =
        normalizarTexto(filtroNome);


      /*
       FILTRO POR NOME
      */

      if (
        buscaNormalizada &&
        !nomeNormalizado.includes(
          buscaNormalizada
        )
      ) {

        return false;

      }


      /*
       DATA DA FICHA
      */

      const data =
        obterData(item.criadoEm);


      /*
       Se não houver data e existir
       algum filtro de data,
       não mostrar a ficha.
      */

      if (
        !data &&
        (
          filtroData ||
          filtroDataInicio ||
          filtroDataFim
        )
      ) {

        return false;

      }


      /*
       APLICAR FILTROS DE DATA
      */

      if (data) {

        if (
          !dataDentroDosFiltros(data)
        ) {

          return false;

        }

      }


      return true;

    });


  /*
   =====================================================
   AGRUPAR POR MÊS
  =====================================================
  */

  const anamnesesPorMes = {};


  anamnesesFiltradas.forEach(
    (item) => {

      const data =
        obterData(item.criadoEm);


      /*
       Fichas sem data
      */

      if (!data) {

        const chave =
          "sem-data";


        if (
          !anamnesesPorMes[chave]
        ) {

          anamnesesPorMes[chave] = [];

        }


        anamnesesPorMes[chave].push(
          item
        );

        return;

      }


      const ano =
        data.getFullYear();


      const mes =
        String(
          data.getMonth() + 1
        ).padStart(
          2,
          "0"
        );


      const chave =
        `${ano}-${mes}`;


      if (
        !anamnesesPorMes[chave]
      ) {

        anamnesesPorMes[chave] = [];

      }


      anamnesesPorMes[chave].push(
        item
      );

    }
  );


  /*
   =====================================================
   ORDENAR FICHAS DENTRO DE CADA MÊS
  =====================================================
  */

  Object.values(
    anamnesesPorMes
  ).forEach(
    (fichas) => {

      fichas.sort(
        (a, b) => {

          const dataA =
            obterData(
              a.criadoEm
            );

          const dataB =
            obterData(
              b.criadoEm
            );


          if (!dataA) {
            return 1;
          }


          if (!dataB) {
            return -1;
          }


          return (
            dataB.getTime() -
            dataA.getTime()
          );

        }
      );

    }
  );


  /*
   =====================================================
   ORDENAR MESES
  =====================================================
  */

  const gruposAnamneses =
    Object.entries(
      anamnesesPorMes
    ).sort(
      ([chaveA], [chaveB]) => {

        if (
          chaveA === "sem-data"
        ) {

          return 1;

        }


        if (
          chaveB === "sem-data"
        ) {

          return -1;

        }


        return chaveB.localeCompare(
          chaveA
        );

      }
    );


  /*
   =====================================================
   FORMATAR MÊS
  =====================================================
  */

  function formatarMesAno(chave) {

    if (
      chave === "sem-data"
    ) {

      return "Sem data";

    }


    const [
      ano,
      mes
    ] = chave.split("-");


    const data =
      new Date(
        Number(ano),
        Number(mes) - 1,
        1
      );


    const texto =
      data.toLocaleDateString(
        "pt-BR",
        {
          month: "long",
          year: "numeric"
        }
      );


    return texto.replace(
      /^./,
      (letra) =>
        letra.toUpperCase()
    );

  }


  /*
   =====================================================
   LIMPAR FILTROS
  =====================================================
  */

  function limparFiltros() {

    setFiltroNome("");

    setFiltroData("");

    setFiltroDataInicio("");

    setFiltroDataFim("");

  }


  /*
   =====================================================
   EXCLUIR FICHA
  =====================================================
  */

  async function excluirFicha(id) {

    const confirmar =
      window.confirm(
        "Tem certeza que deseja excluir esta ficha de anamnese?\n\nEssa ação não poderá ser desfeita."
      );


    if (!confirmar) {

      return;

    }


    try {

      await excluirAnamnese(id);


      setAnamneses(
        (listaAnterior) =>
          listaAnterior.filter(
            (item) =>
              item.id !== id
          )
      );


      alert(
        "Ficha excluída com sucesso."
      );

    } catch (error) {

      console.error(
        "Erro ao excluir ficha:",
        error
      );


      alert(
        "Não foi possível excluir a ficha."
      );

    }

  }


  /*
   =====================================================
   GERAR PDF
  =====================================================
  */

  async function gerarPDF(id) {

    try {

      const ficha =
        await buscarAnamnesePorId(id);


      if (!ficha) {

        alert(
          "Ficha não encontrada."
        );

        return;

      }


      const pdf =
        new jsPDF({

          orientation: "portrait",

          unit: "mm",

          format: "a4"

        });


      const larguraPagina = 210;

      const alturaPagina = 297;

      const margem = 18;

      const larguraConteudo =
        larguraPagina -
        margem * 2;


      let y = 20;


      /*
       =================================================
       CORES
      =================================================
      */

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


      /*
       =================================================
       RODAPÉ
      =================================================
      */

      function adicionarRodape() {

        pdf.setDrawColor(
          ...verdeClaro
        );

        pdf.setLineWidth(
          0.3
        );


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


      /*
       =================================================
       VERIFICAR ESPAÇO
      =================================================
      */

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


      /*
       =================================================
       CABEÇALHO
      =================================================
      */

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


      /*
       =================================================
       IDENTIFICAÇÃO
      =================================================
      */

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
        ficha.nome ||
        ficha.nomeUsuario ||
        "Nome não informado",
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


      pdf.text(
        `Enviada em: ${
          ficha.criadoEm?.toDate
            ? ficha.criadoEm
                .toDate()
                .toLocaleDateString(
                  "pt-BR"
                )
            : ficha.dataEnvio
              ? new Date(
                  ficha.dataEnvio
                ).toLocaleDateString(
                  "pt-BR"
                )
              : "Não informada"
        }`,
        margem + 6,
        y + 22
      );


      y += 36;


      /*
       =================================================
       ADICIONAR SEÇÃO
      =================================================
      */

      function adicionarSecao(
        titulo
      ) {

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


      /*
       =================================================
       ADICIONAR CAMPO
      =================================================
      */

      function adicionarCampo(
        nome,
        valor
      ) {

        let resposta;


        if (
          valor === undefined ||
          valor === null ||
          valor === ""
        ) {

          resposta =
            "Não informado";

        } else {

          resposta =
            String(valor);

        }


        const linhas =
          pdf.splitTextToSize(
            resposta,
            larguraConteudo - 12
          );


        const altura =
          Math.max(
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


      /*
       =================================================
       DADOS PESSOAIS
      =================================================
      */

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


      /*
       =================================================
       CONTATO DE EMERGÊNCIA
      =================================================
      */

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


      /*
       =================================================
       SAÚDE FÍSICA
      =================================================
      */

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
        "Outras doenças ou condições",
        ficha.doencas
      );


      /*
       =================================================
       NEURODIVERGÊNCIAS
      =================================================
      */

      adicionarSecao(
        "Neurodivergências"
      );


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


      /*
       =================================================
       SAÚDE MENTAL
      =================================================
      */

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


      /*
       =================================================
       HISTÓRICO EMOCIONAL E PSIQUIÁTRICO
      =================================================
      */

      adicionarSecao(
        "Histórico emocional e psiquiátrico"
      );


      adicionarCampo(
        "Já teve crises de pânico?",
        ficha.crisePanico
      );


      adicionarCampo(
        "Já teve alucinações, delírios ou perda de contato com a realidade?",
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
          "Qual medicação?",
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


      /*
       =================================================
       USO DE SUBSTÂNCIAS
      =================================================
      */

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


      /*
       =================================================
       MEDICINAS CONSAGRADAS
      =================================================
      */

      adicionarSecao(
        "Medicinas já consagradas"
      );


      adicionarCampo(
        "Medicinas",
        ficha.medicinasConsagradas?.join(
          ", "
        )
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


      /*
       =================================================
       CERIMÔNIA E INTENÇÃO
      =================================================
      */

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


      /*
       =================================================
       CONSENTIMENTO
      =================================================
      */

      adicionarSecao(
        "Consentimento"
      );


      adicionarCampo(
        "Aceitou os termos",
        ficha.aceitouTermos
          ? "SIM"
          : "NÃO"
      );


      /*
       =================================================
       RODAPÉ
      =================================================
      */

      adicionarRodape();


      /*
       =================================================
       SALVAR PDF
      =================================================
      */

      const nomeArquivo =
        ficha.nome ||
        ficha.nomeUsuario ||
        "Participante";


      pdf.save(
        `Anamnese-${nomeArquivo}.pdf`
      );


    } catch (error) {

      console.error(
        "Erro ao gerar PDF:",
        error
      );


      alert(
        "Erro ao gerar PDF."
      );

    }

  }


  /*
   =====================================================
   RENDER
  =====================================================
  */

  return (

    <main className="anamneses-admin">


      {/* =================================================
          TOPO
      =================================================
      */}

      <header className="admin-topo">

        <button
          className="btn-voltar-admin"
          onClick={() =>
            navigate(
              "/admin/dashboard"
            )
          }
        >

          <FaArrowLeft />

          Voltar

        </button>


        <h1>
          🌿 Fichas de Anamnese
        </h1>

      </header>


      {/* =================================================
          FILTROS
      =================================================
      */}

      <section className="filtros-anamneses">


        {/* BUSCA POR NOME */}

        <div className="filtro-grupo filtro-nome">

          <label>
            <FaSearch />

            Buscar por nome
          </label>


          <div className="campo-com-icone">

            <FaSearch />

            <input
              type="text"
              placeholder="Digite o nome do participante..."
              value={filtroNome}
              onChange={(e) =>
                setFiltroNome(
                  e.target.value
                )
              }
            />


            {filtroNome && (

              <button
                className="limpar-campo"
                onClick={() =>
                  setFiltroNome("")
                }
                type="button"
                aria-label="Limpar busca"
              >

                <FaTimes />

              </button>

            )}

          </div>

        </div>


        {/* DATA ESPECÍFICA */}

        <div className="filtro-grupo">

          <label>
            <FaCalendarAlt />

            Data específica
          </label>


          <input
            type="date"
            value={filtroData}
            onChange={(e) => {

              const valor =
                e.target.value;


              setFiltroData(
                valor
              );


              if (valor) {

                setFiltroDataInicio(
                  ""
                );

                setFiltroDataFim(
                  ""
                );

              }

            }}
          />

        </div>


        {/* DATA INICIAL */}

        <div className="filtro-grupo">

          <label>
            <FaCalendarAlt />

            De
          </label>


          <input
            type="date"
            value={filtroDataInicio}
            onChange={(e) => {

              const valor =
                e.target.value;


              setFiltroDataInicio(
                valor
              );


              if (valor) {

                setFiltroData(
                  ""
                );

              }

            }}
          />

        </div>


        {/* DATA FINAL */}

        <div className="filtro-grupo">

          <label>
            <FaCalendarAlt />

            Até
          </label>


          <input
            type="date"
            value={filtroDataFim}
            onChange={(e) => {

              const valor =
                e.target.value;


              setFiltroDataFim(
                valor
              );


              if (valor) {

                setFiltroData(
                  ""
                );

              }

            }}
          />

        </div>


        {/* LIMPAR */}

        <button
          className="btn-limpar-filtros"
          onClick={
            limparFiltros
          }
          type="button"
        >

          <FaTimes />

          Limpar filtros

        </button>


      </section>


      {/* =================================================
          RESUMO
      =================================================
      */}

      <div className="resultado-filtros">

        <span>

          {anamnesesFiltradas.length}

          {" "}

          {anamnesesFiltradas.length === 1
            ? "ficha encontrada"
            : "fichas encontradas"}

        </span>


        {(
          filtroNome ||
          filtroData ||
          filtroDataInicio ||
          filtroDataFim
        ) && (

          <small>

            Filtros ativos

          </small>

        )}

      </div>


      {/* =================================================
          LISTA
      =================================================
      */}

      <section className="lista-anamneses">


        {anamnesesFiltradas.length === 0 && (

          <div className="nenhuma-anamnese">

            <FaSearch />

            <h2>
              Nenhuma ficha encontrada
            </h2>

            <p>
              Tente alterar os filtros
              utilizados.
            </p>


            <button
              onClick={
                limparFiltros
              }
            >

              Limpar filtros

            </button>

          </div>

        )}


        {/* =================================================
            GRUPOS POR MÊS
        =================================================
        */}

        {gruposAnamneses.map(
          ([mes, fichas]) => (

            <div
              className="grupo-anamneses"
              key={mes}
            >


              {/* CABEÇALHO DO MÊS */}

              <div className="titulo-mes-anamneses">

                <div>

                  <span className="icone-mes">
                    📂
                  </span>

                  <h2>
                    {formatarMesAno(
                      mes
                    )}
                  </h2>

                </div>


                <span className="contador-mes">

                  {fichas.length}

                  {" "}

                  {fichas.length === 1
                    ? "ficha"
                    : "fichas"}

                </span>

              </div>


              {/* FICHAS */}

              <div className="cards-mes-anamneses">

                {fichas.map(
                  (item) => (

                    <article
                      className="card-anamnese"
                      key={item.id}
                    >


                      <h2>

                        {
                          item.nome ||
                          item.nomeUsuario ||
                          "Nome não informado"
                        }

                      </h2>


                      <p>

                        📧{" "}

                        {
                          item.email ||
                          item.emailUsuario ||
                          "E-mail não informado"
                        }

                      </p>


                      <span>

                        Enviada em:

                        {" "}

                        {
                          formatarData(
                            item.criadoEm
                          )
                        }

                      </span>


                      <div className="acoes-anamnese">


                        <button
                          onClick={() =>
                            navigate(
                              `/admin/anamnese/${item.id}`
                            )
                          }
                        >

                          <FaEye />

                          Ver ficha

                        </button>


                        <button
                          onClick={() =>
                            gerarPDF(
                              item.id
                            )
                          }
                        >

                          <FaFilePdf />

                          PDF

                        </button>


                        <button
                          className="btn-excluir"
                          onClick={() =>
                            excluirFicha(
                              item.id
                            )
                          }
                        >

                          <FaTrash />

                          Excluir ficha

                        </button>


                      </div>


                    </article>

                  )
                )}

              </div>


            </div>

          )
        )}


      </section>


    </main>

  );

}


export default AnamnesesAdmin;

