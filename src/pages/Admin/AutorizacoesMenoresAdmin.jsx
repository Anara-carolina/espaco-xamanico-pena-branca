import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaSearch,
  FaCalendarAlt,
  FaEye,
  FaFilePdf,
  FaTimes,
  FaUserShield,
  FaFileSignature
} from "react-icons/fa";
import jsPDF from "jspdf";

import { buscarAnamneses } from "../../services/firebaseService";

import "./AutorizacoesMenoresAdmin.css";


// =====================================================
// HELPERS
// =====================================================

function obterValor(objeto, caminhos, valorPadrao = "") {
  for (const caminho of caminhos) {
    const partes = caminho.split(".");
    let atual = objeto;

    for (const parte of partes) {
      if (
        atual === null ||
        atual === undefined ||
        atual[parte] === undefined
      ) {
        atual = undefined;
        break;
      }

      atual = atual[parte];
    }

    if (
      atual !== undefined &&
      atual !== null &&
      atual !== ""
    ) {
      return atual;
    }
  }

  return valorPadrao;
}


function converterData(data) {
  if (!data) {
    return null;
  }

  if (data instanceof Date) {
    return data;
  }

  if (
    typeof data === "object" &&
    typeof data.toDate === "function"
  ) {
    return data.toDate();
  }

  if (
    typeof data === "object" &&
    data.seconds !== undefined
  ) {
    return new Date(data.seconds * 1000);
  }

  if (typeof data === "string") {
    const dataNormalizada = data.includes("T")
      ? data
      : `${data}T00:00:00`;

    const resultado = new Date(dataNormalizada);

    if (!Number.isNaN(resultado.getTime())) {
      return resultado;
    }
  }

  return null;
}


function formatarData(data) {
  const dataConvertida = converterData(data);

  if (!dataConvertida) {
    return "Não informado";
  }

  return dataConvertida.toLocaleDateString("pt-BR");
}


function formatarDataHora(data) {
  const dataConvertida = converterData(data);

  if (!dataConvertida) {
    return "Não informado";
  }

  return dataConvertida.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  });
}


function obterNomeMenor(anamnese) {
  return obterValor(anamnese, [
    "nome",
    "nomeCompleto",
    "dadosPessoais.nome",
    "formularioInicial.nome",
    "formularioInicial.nomeCompleto"
  ], "Nome não informado");
}


function obterDataNascimento(anamnese) {
  return obterValor(anamnese, [
    "dataNascimento",
    "nascimento",
    "dataDeNascimento",
    "dadosPessoais.dataNascimento",
    "formularioInicial.dataNascimento"
  ], "");
}


function calcularIdade(dataNascimento) {
  if (!dataNascimento) {
    return "";
  }

  const nascimento = converterData(dataNascimento);

  if (!nascimento) {
    return "";
  }

  const hoje = new Date();

  let idade =
    hoje.getFullYear() -
    nascimento.getFullYear();

  const mesAtual = hoje.getMonth();
  const mesNascimento = nascimento.getMonth();

  if (
    mesAtual < mesNascimento ||
    (
      mesAtual === mesNascimento &&
      hoje.getDate() < nascimento.getDate()
    )
  ) {
    idade--;
  }

  return idade;
}


function obterAutorizacao(anamnese) {
  const autorizacao =
    anamnese.autorizacaoMenor ||
    anamnese.autorizacaoResponsavel ||
    anamnese.autorizacao ||
    {};

  return {
    responsavelNome: obterValor(
      autorizacao,
      ["responsavelNome", "nome", "nomeResponsavel"],
      obterValor(anamnese, [
        "responsavelNome",
        "nomeResponsavel"
      ], "")
    ),

    responsavelCpf: obterValor(
      autorizacao,
      ["responsavelCpf", "cpf", "cpfResponsavel"],
      obterValor(anamnese, [
        "responsavelCpf",
        "cpfResponsavel"
      ], "")
    ),

    responsavelTelefone: obterValor(
      autorizacao,
      [
        "responsavelTelefone",
        "telefone",
        "telefoneResponsavel"
      ],
      obterValor(anamnese, [
        "responsavelTelefone",
        "telefoneResponsavel"
      ], "")
    ),

    responsavelParentesco: obterValor(
      autorizacao,
      [
        "responsavelParentesco",
        "parentesco",
        "grauParentesco"
      ],
      obterValor(anamnese, [
        "responsavelParentesco",
        "parentesco"
      ], "")
    ),

    responsavelAssinatura: obterValor(
      autorizacao,
      [
        "responsavelAssinatura",
        "assinatura",
        "assinaturaResponsavel"
      ],
      obterValor(anamnese, [
        "responsavelAssinatura",
        "assinaturaResponsavel"
      ], "")
    ),

    responsavelAutorizou:
      autorizacao.responsavelAutorizou ??
      autorizacao.autorizou ??
      anamnese.responsavelAutorizou ??
      false,

    dataAutorizacaoResponsavel: obterValor(
      autorizacao,
      [
        "dataAutorizacaoResponsavel",
        "dataAutorizacao",
        "data"
      ],
      obterValor(anamnese, [
        "dataAutorizacaoResponsavel",
        "dataAutorizacao"
      ], "")
    ),

    versaoTermoResponsavel: obterValor(
      autorizacao,
      [
        "versaoTermoResponsavel",
        "versaoTermo",
        "versao"
      ],
      obterValor(anamnese, [
        "versaoTermoResponsavel"
      ], "1.0")
    ),

    termo: obterValor(
      autorizacao,
      [
        "termo",
        "textoTermo",
        "termoResponsavel"
      ],
      obterValor(anamnese, [
        "termoResponsavel",
        "textoTermoResponsavel"
      ], "")
    )
  };
}


function possuiAutorizacao(anamnese) {
  const autorizacao = obterAutorizacao(anamnese);

  return (
    autorizacao.responsavelAutorizou === true ||
    Boolean(autorizacao.responsavelNome) ||
    Boolean(autorizacao.responsavelAssinatura)
  );
}


function obterDataReferencia(anamnese) {
  const autorizacao = obterAutorizacao(anamnese);

  return (
    autorizacao.dataAutorizacaoResponsavel ||
    anamnese.criadoEm ||
    anamnese.dataEnvio ||
    anamnese.createdAt ||
    null
  );
}


function obterChaveMes(data) {
  const dataConvertida = converterData(data);

  if (!dataConvertida) {
    return "sem-data";
  }

  const ano = dataConvertida.getFullYear();
  const mes = String(
    dataConvertida.getMonth() + 1
  ).padStart(2, "0");

  return `${ano}-${mes}`;
}


function formatarMesAno(chave) {
  if (chave === "sem-data") {
    return "Sem data";
  }

  const [ano, mes] = chave.split("-");

  const data = new Date(
    Number(ano),
    Number(mes) - 1,
    1
  );

  return data.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric"
  });
}


function capitalizar(texto) {
  if (!texto) {
    return "";
  }

  return texto.charAt(0).toUpperCase() + texto.slice(1);
}


// =====================================================
// TERMO PADRÃO
// =====================================================

function obterTermoCompleto(anamnese) {
  const autorizacao = obterAutorizacao(anamnese);

  if (autorizacao.termo) {
    return autorizacao.termo;
  }

  return `
AUTORIZAÇÃO DO RESPONSÁVEL LEGAL PARA PARTICIPAÇÃO DE MENOR DE 18 ANOS

Eu, ${autorizacao.responsavelNome || "________________________________"}, na condição de responsável legal pelo(a) menor ${obterNomeMenor(anamnese)}, declaro que autorizo sua participação nas atividades realizadas pelo Espaço Xamânico Pena Branca, estando ciente das informações apresentadas durante o preenchimento da ficha e das orientações fornecidas pelo espaço.

Declaro que as informações fornecidas são verdadeiras e que assumo a responsabilidade pela autorização concedida ao menor.

Declaro ainda estar ciente de que a participação do menor fica condicionada à presença do pai, mãe ou responsável legal que tenha realizado a autorização, durante toda a permanência do menor na atividade.

Estou ciente de que devo informar previamente qualquer condição relevante que possa interferir na participação do menor na atividade.

Por livre e espontânea vontade, confirmo minha autorização mediante assinatura eletrônica.
`.trim();
}


// =====================================================
// COMPONENTE
// =====================================================

export default function AutorizacoesMenoresAdmin() {
  const navigate = useNavigate();

  const [anamneses, setAnamneses] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [busca, setBusca] = useState("");
  const [mesSelecionado, setMesSelecionado] = useState("");

  const [autorizacaoSelecionada, setAutorizacaoSelecionada] =
    useState(null);

  const [gerandoPdf, setGerandoPdf] = useState(null);

  const [erro, setErro] = useState("");


  // ===================================================
  // BUSCAR DADOS
  // ===================================================

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        setErro("");

        const resultado = await buscarAnamneses();

        const somenteAutorizacoes = (
          Array.isArray(resultado)
            ? resultado
            : []
        ).filter(possuiAutorizacao);

        setAnamneses(somenteAutorizacoes);
      } catch (error) {
        console.error(
          "Erro ao carregar autorizações:",
          error
        );

        setErro(
          "Não foi possível carregar as autorizações dos menores."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);


  // ===================================================
  // MESES DISPONÍVEIS
  // ===================================================

  const mesesDisponiveis = useMemo(() => {
    const meses = new Set();

    anamneses.forEach((anamnese) => {
      meses.add(
        obterChaveMes(
          obterDataReferencia(anamnese)
        )
      );
    });

    return Array.from(meses).sort((a, b) => {
      if (a === "sem-data") {
        return 1;
      }

      if (b === "sem-data") {
        return -1;
      }

      return b.localeCompare(a);
    });
  }, [anamneses]);


  // ===================================================
  // FILTROS
  // ===================================================

  const autorizacoesFiltradas = useMemo(() => {
    const termoBusca = busca
      .trim()
      .toLowerCase();

    return anamneses
      .filter((anamnese) => {
        const nomeMenor = obterNomeMenor(
          anamnese
        ).toLowerCase();

        const autorizacao =
          obterAutorizacao(anamnese);

        const nomeResponsavel =
          autorizacao.responsavelNome
            .toLowerCase();

        const correspondeNome =
          !termoBusca ||
          nomeMenor.includes(termoBusca) ||
          nomeResponsavel.includes(termoBusca);

        const correspondeMes =
          !mesSelecionado ||
          obterChaveMes(
            obterDataReferencia(anamnese)
          ) === mesSelecionado;

        return (
          correspondeNome &&
          correspondeMes
        );
      })
      .sort((a, b) => {
        const dataA = converterData(
          obterDataReferencia(a)
        );

        const dataB = converterData(
          obterDataReferencia(b)
        );

        if (!dataA && !dataB) {
          return 0;
        }

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
      });
  }, [
    anamneses,
    busca,
    mesSelecionado
  ]);


  // ===================================================
  // AGRUPAR POR MÊS
  // ===================================================

  const autorizacoesAgrupadas = useMemo(() => {
    const grupos = {};

    autorizacoesFiltradas.forEach(
      (anamnese) => {
        const chave = obterChaveMes(
          obterDataReferencia(anamnese)
        );

        if (!grupos[chave]) {
          grupos[chave] = [];
        }

        grupos[chave].push(anamnese);
      }
    );

    return Object.entries(grupos).sort(
      ([chaveA], [chaveB]) => {
        if (chaveA === "sem-data") {
          return 1;
        }

        if (chaveB === "sem-data") {
          return -1;
        }

        return chaveB.localeCompare(chaveA);
      }
    );
  }, [autorizacoesFiltradas]);


  // ===================================================
  // LIMPAR FILTROS
  // ===================================================

  function limparFiltros() {
    setBusca("");
    setMesSelecionado("");
  }


  // ===================================================
  // GERAR PDF
  // ===================================================

  async function gerarPdf(anamnese) {
    const id = anamnese.id;

    try {
      setGerandoPdf(id);

      const autorizacao =
        obterAutorizacao(anamnese);

      const nomeMenor =
        obterNomeMenor(anamnese);

      const dataNascimento =
        obterDataNascimento(anamnese);

      const idade =
        calcularIdade(dataNascimento);

      const termo =
        obterTermoCompleto(anamnese);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const larguraPagina =
        pdf.internal.pageSize.getWidth();

      const alturaPagina =
        pdf.internal.pageSize.getHeight();

      const margem = 18;

      let y = 20;


      // -----------------------------------------------
      // FUNÇÕES DO PDF
      // -----------------------------------------------

      function verificarEspaco(alturaNecessaria = 10) {
        if (
          y + alturaNecessaria >
          alturaPagina - 18
        ) {
          pdf.addPage();
          y = 20;

          desenharCabecalho();
        }
      }


      function desenharCabecalho() {
        pdf.setFillColor(
          30,
          67,
          48
        );

        pdf.rect(
          0,
          0,
          larguraPagina,
          28,
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

        pdf.setFontSize(15);

        pdf.text(
          "ESPAÇO XAMÂNICO PENA BRANCA",
          margem,
          12
        );

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(8.5);

        pdf.text(
          "Autorização do responsável legal para menor de 18 anos",
          margem,
          20
        );

        pdf.setTextColor(
          35,
          35,
          35
        );

        y = 38;
      }


      function adicionarTitulo(texto) {
        verificarEspaco(16);

        pdf.setFillColor(
          239,
          234,
          222
        );

        pdf.roundedRect(
          margem,
          y - 6,
          larguraPagina - margem * 2,
          11,
          2,
          2,
          "F"
        );

        pdf.setTextColor(
          55,
          55,
          55
        );

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(10);

        pdf.text(
          texto,
          margem + 4,
          y + 1
        );

        y += 14;
      }


      function adicionarLinha(
        rotulo,
        valor
      ) {
        const texto =
          `${rotulo}: ${valor || "Não informado"}`;

        const linhas =
          pdf.splitTextToSize(
            texto,
            larguraPagina - margem * 2
          );

        const altura =
          linhas.length * 5;

        verificarEspaco(
          altura + 3
        );

        pdf.setTextColor(
          50,
          50,
          50
        );

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(9.5);

        pdf.text(
          linhas,
          margem,
          y
        );

        y += altura + 2;
      }


      function adicionarTexto(
        texto
      ) {
        if (!texto) {
          return;
        }

        const linhas =
          pdf.splitTextToSize(
            texto,
            larguraPagina - margem * 2
          );

        const altura =
          linhas.length * 5;

        verificarEspaco(
          Math.min(
            altura,
            25
          )
        );

        pdf.setTextColor(
          55,
          55,
          55
        );

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(9.5);

        const linhasPorPagina =
          Math.floor(
            (alturaPagina - 22 - y) / 5
          );

        let indice = 0;

        while (
          indice < linhas.length
        ) {
          const limite =
            Math.max(
              1,
              linhasPorPagina
            );

          const bloco =
            linhas.slice(
              indice,
              indice + limite
            );

          pdf.text(
            bloco,
            margem,
            y
          );

          y +=
            bloco.length * 5;

          indice += bloco.length;

          if (
            indice < linhas.length
          ) {
            pdf.addPage();
            y = 20;
            desenharCabecalho();
          }
        }

        y += 4;
      }


      function adicionarAssinatura(
        assinatura
      ) {
        if (!assinatura) {
          adicionarLinha(
            "Assinatura",
            "Não registrada"
          );

          return;
        }

        verificarEspaco(48);

        pdf.setTextColor(
          50,
          50,
          50
        );

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(9.5);

        pdf.text(
          "Assinatura eletrônica do responsável:",
          margem,
          y
        );

        y += 5;

        try {
          pdf.addImage(
            assinatura,
            "PNG",
            margem,
            y,
            70,
            30
          );

          y += 34;
        } catch (error) {
          console.error(
            "Não foi possível inserir a assinatura no PDF:",
            error
          );

          pdf.setFont(
            "helvetica",
            "normal"
          );

          pdf.setFontSize(9);

          pdf.text(
            "Assinatura eletrônica registrada no sistema.",
            margem,
            y
          );

          y += 8;
        }
      }


      function desenharRodape() {
        const numeroPaginas =
          pdf.internal.getNumberOfPages();

        for (
          let pagina = 1;
          pagina <= numeroPaginas;
          pagina++
        ) {
          pdf.setPage(pagina);

          pdf.setDrawColor(
            210,
            205,
            195
          );

          pdf.line(
            margem,
            alturaPagina - 13,
            larguraPagina - margem,
            alturaPagina - 13
          );

          pdf.setFont(
            "helvetica",
            "normal"
          );

          pdf.setFontSize(7.5);

          pdf.setTextColor(
            110,
            110,
            110
          );

          pdf.text(
            "Espaço Xamânico Pena Branca",
            margem,
            alturaPagina - 8
          );

          pdf.text(
            `Página ${pagina} de ${numeroPaginas}`,
            larguraPagina - margem,
            alturaPagina - 8,
            {
              align: "right"
            }
          );
        }
      }


      // -----------------------------------------------
      // CABEÇALHO
      // -----------------------------------------------

      desenharCabecalho();


      // -----------------------------------------------
      // TÍTULO
      // -----------------------------------------------

      pdf.setTextColor(
        40,
        40,
        40
      );

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(17);

      pdf.text(
        "AUTORIZAÇÃO DE MENOR",
        margem,
        y
      );

      y += 8;

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(8.5);

      pdf.setTextColor(
        100,
        100,
        100
      );

      pdf.text(
        "Documento registrado eletronicamente pelo sistema.",
        margem,
        y
      );

      y += 10;


      // -----------------------------------------------
      // DADOS DO MENOR
      // -----------------------------------------------

      adicionarTitulo(
        "DADOS DO MENOR"
      );

      adicionarLinha(
        "Nome completo",
        nomeMenor
      );

      adicionarLinha(
        "Data de nascimento",
        formatarData(dataNascimento)
      );

      adicionarLinha(
        "Idade",
        idade !== ""
          ? `${idade} anos`
          : "Não informada"
      );

      y += 3;


      // -----------------------------------------------
      // DADOS DO RESPONSÁVEL
      // -----------------------------------------------

      adicionarTitulo(
        "DADOS DO RESPONSÁVEL LEGAL"
      );

      adicionarLinha(
        "Nome completo",
        autorizacao.responsavelNome
      );

      adicionarLinha(
        "CPF",
        autorizacao.responsavelCpf
      );

      adicionarLinha(
        "Telefone",
        autorizacao.responsavelTelefone
      );

      adicionarLinha(
        "Parentesco",
        autorizacao.responsavelParentesco
      );

      y += 3;


      // -----------------------------------------------
      // DADOS DA AUTORIZAÇÃO
      // -----------------------------------------------

      adicionarTitulo(
        "DADOS DA AUTORIZAÇÃO"
      );

      adicionarLinha(
        "Data da autorização",
        formatarDataHora(
          autorizacao.dataAutorizacaoResponsavel
        )
      );

      adicionarLinha(
        "Versão do termo",
        autorizacao.versaoTermoResponsavel
      );

      adicionarLinha(
        "Autorização confirmada",
        autorizacao.responsavelAutorizou
          ? "Sim"
          : "Não"
      );

      y += 3;


      // -----------------------------------------------
      // TERMO
      // -----------------------------------------------

      adicionarTitulo(
        "TERMO DE AUTORIZAÇÃO"
      );

      adicionarTexto(
        termo
      );


      // -----------------------------------------------
      // ASSINATURA
      // -----------------------------------------------

      adicionarTitulo(
        "ASSINATURA"
      );

      adicionarAssinatura(
        autorizacao.responsavelAssinatura
      );


      // -----------------------------------------------
      // IDENTIFICAÇÃO FINAL
      // -----------------------------------------------

      verificarEspaco(35);

      pdf.setDrawColor(
        190,
        185,
        175
      );

      pdf.line(
        margem,
        y,
        larguraPagina - margem,
        y
      );

      y += 8;

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(8);

      pdf.setTextColor(
        95,
        95,
        95
      );

      pdf.text(
        `Registro da ficha: ${id}`,
        margem,
        y
      );

      y += 5;

      pdf.text(
        `Documento gerado em: ${formatarDataHora(new Date())}`,
        margem,
        y
      );


      // -----------------------------------------------
      // RODAPÉ
      // -----------------------------------------------

      desenharRodape();


      // -----------------------------------------------
      // NOME DO ARQUIVO
      // -----------------------------------------------

      const nomeArquivo =
        nomeMenor
          .normalize("NFD")
          .replace(
            /[\u0300-\u036f]/g,
            ""
          )
          .replace(
            /[^a-zA-Z0-9]+/g,
            "-"
          )
          .replace(
            /^-+|-+$/g,
            ""
          )
          .toLowerCase();

      pdf.save(
        `autorizacao-menor-${nomeArquivo || "documento"}.pdf`
      );

    } catch (error) {
      console.error(
        "Erro ao gerar PDF da autorização:",
        error
      );

      alert(
        "Não foi possível gerar o PDF da autorização."
      );
    } finally {
      setGerandoPdf(null);
    }
  }


  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="autorizacoes-menores-admin">

      <header className="autorizacoes-admin-header">

        <div className="autorizacoes-admin-header-conteudo">

          <button
            type="button"
            className="btn-voltar-admin"
            onClick={() => navigate("/admin")}
          >
            <FaArrowLeft />
            <span>Voltar ao painel</span>
          </button>

          <div className="autorizacoes-admin-titulo">

            <div className="autorizacoes-admin-titulo-icone">
              <FaFileSignature />
            </div>

            <div>
              <h1>
                Autorizações de Menores
              </h1>

              <p>
                Autorizações assinadas pelos responsáveis legais
              </p>
            </div>

          </div>

        </div>

      </header>


      <main className="autorizacoes-admin-conteudo">

        {erro && (
          <div className="autorizacoes-admin-erro">
            {erro}
          </div>
        )}


        <section className="autorizacoes-admin-filtros">

          <div className="filtro-autorizacoes campo-busca">

            <label htmlFor="busca-autorizacao">
              Buscar
            </label>

            <div className="campo-busca-wrapper">

              <FaSearch />

              <input
                id="busca-autorizacao"
                type="text"
                placeholder="Nome do menor ou responsável"
                value={busca}
                onChange={(event) =>
                  setBusca(event.target.value)
                }
              />

            </div>

          </div>


          <div className="filtro-autorizacoes">

            <label htmlFor="mes-autorizacao">
              Mês
            </label>

            <div className="campo-select-wrapper">

              <FaCalendarAlt />

              <select
                id="mes-autorizacao"
                value={mesSelecionado}
                onChange={(event) =>
                  setMesSelecionado(
                    event.target.value
                  )
                }
              >
                <option value="">
                  Todos os meses
                </option>

                {mesesDisponiveis.map(
                  (mes) => (
                    <option
                      key={mes}
                      value={mes}
                    >
                      {capitalizar(
                        formatarMesAno(mes)
                      )}
                    </option>
                  )
                )}

              </select>

            </div>

          </div>


          {(busca || mesSelecionado) && (
            <button
              type="button"
              className="btn-limpar-filtros"
              onClick={limparFiltros}
            >
              <FaTimes />
              Limpar filtros
            </button>
          )}

        </section>


        <section className="autorizacoes-admin-resumo">

          <div className="resumo-autorizacoes-icone">
            <FaUserShield />
          </div>

          <div>

            <strong>
              {autorizacoesFiltradas.length}
            </strong>

            <span>
              {autorizacoesFiltradas.length === 1
                ? " autorização encontrada"
                : " autorizações encontradas"}
            </span>

          </div>

        </section>


        {carregando ? (

          <div className="autorizacoes-admin-carregando">
            <div className="spinner-autorizacoes" />
            <p>
              Carregando autorizações...
            </p>
          </div>

        ) : autorizacoesFiltradas.length === 0 ? (

          <div className="autorizacoes-admin-vazio">

            <FaFileSignature />

            <h2>
              Nenhuma autorização encontrada
            </h2>

            <p>
              Não existem autorizações que correspondam aos filtros selecionados.
            </p>

          </div>

        ) : (

          <div className="autorizacoes-admin-grupos">

            {autorizacoesAgrupadas.map(
              ([mes, itens]) => (

                <section
                  className="grupo-autorizacoes"
                  key={mes}
                >

                  <div className="grupo-autorizacoes-titulo">

                    <FaCalendarAlt />

                    <h2>
                      {capitalizar(
                        formatarMesAno(mes)
                      )}
                    </h2>

                    <span>
                      {itens.length}
                    </span>

                  </div>


                  <div className="lista-autorizacoes">

                    {itens.map(
                      (anamnese) => {

                        const autorizacao =
                          obterAutorizacao(
                            anamnese
                          );

                        const nomeMenor =
                          obterNomeMenor(
                            anamnese
                          );

                        const dataNascimento =
                          obterDataNascimento(
                            anamnese
                          );

                        const idade =
                          calcularIdade(
                            dataNascimento
                          );

                        return (
                          <article
                            className="card-autorizacao-menor"
                            key={anamnese.id}
                          >

                            <div className="card-autorizacao-topo">

                              <div className="card-autorizacao-identificacao">

                                <div className="card-autorizacao-icone">
                                  <FaUserShield />
                                </div>

                                <div>

                                  <h3>
                                    {nomeMenor}
                                  </h3>

                                  <p>
                                    {idade !== ""
                                      ? `${idade} anos`
                                      : "Idade não informada"}
                                  </p>

                                </div>

                              </div>


                              <span className="status-autorizacao">
                                Autorização registrada
                              </span>

                            </div>


                            <div className="card-autorizacao-dados">

                              <div>
                                <span>
                                  Responsável
                                </span>

                                <strong>
                                  {autorizacao.responsavelNome ||
                                    "Não informado"}
                                </strong>
                              </div>


                              <div>
                                <span>
                                  Parentesco
                                </span>

                                <strong>
                                  {autorizacao.responsavelParentesco ||
                                    "Não informado"}
                                </strong>
                              </div>


                              <div>
                                <span>
                                  Data da autorização
                                </span>

                                <strong>
                                  {formatarData(
                                    autorizacao.dataAutorizacaoResponsavel
                                  )}
                                </strong>
                              </div>

                            </div>


                            <div className="card-autorizacao-acoes">

                              <button
                                type="button"
                                className="btn-acao-autorizacao btn-ver-autorizacao"
                                onClick={() =>
                                  setAutorizacaoSelecionada(
                                    anamnese
                                  )
                                }
                              >
                                <FaEye />
                                Ver autorização
                              </button>


                              <button
                                type="button"
                                className="btn-acao-autorizacao btn-pdf-autorizacao"
                                onClick={() =>
                                  gerarPdf(anamnese)
                                }
                                disabled={
                                  gerandoPdf ===
                                  anamnese.id
                                }
                              >
                                <FaFilePdf />

                                {gerandoPdf ===
                                anamnese.id
                                  ? "Gerando PDF..."
                                  : "Gerar PDF"}
                              </button>


                              <button
                                type="button"
                                className="btn-acao-autorizacao btn-ver-anamnese"
                                onClick={() =>
                                  navigate(
                                    `/admin/anamnese/${anamnese.id}`
                                  )
                                }
                              >
                                <FaFileSignature />
                                Ver anamnese
                              </button>

                            </div>

                          </article>
                        );
                      }
                    )}

                  </div>

                </section>
              )
            )}

          </div>

        )}

      </main>


      {autorizacaoSelecionada && (
        <div
          className="modal-autorizacao-overlay"
          onClick={() =>
            setAutorizacaoSelecionada(null)
          }
        >

          <div
            className="modal-autorizacao"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-autorizacao-header">

              <div>

                <span>
                  Documento de autorização
                </span>

                <h2>
                  Autorização de Menor
                </h2>

              </div>


              <button
                type="button"
                className="btn-fechar-modal-autorizacao"
                onClick={() =>
                  setAutorizacaoSelecionada(null)
                }
                aria-label="Fechar"
              >
                <FaTimes />
              </button>

            </div>


            <div className="modal-autorizacao-conteudo">

              {(() => {
                const anamnese =
                  autorizacaoSelecionada;

                const autorizacao =
                  obterAutorizacao(
                    anamnese
                  );

                const nomeMenor =
                  obterNomeMenor(
                    anamnese
                  );

                const dataNascimento =
                  obterDataNascimento(
                    anamnese
                  );

                const idade =
                  calcularIdade(
                    dataNascimento
                  );

                return (
                  <>
                    <section className="modal-autorizacao-secao">

                      <div className="modal-autorizacao-secao-titulo">
                        <FaUserShield />

                        <h3>
                          Dados do menor
                        </h3>
                      </div>


                      <div className="modal-autorizacao-grid">

                        <div>
                          <span>
                            Nome completo
                          </span>

                          <strong>
                            {nomeMenor}
                          </strong>
                        </div>


                        <div>
                          <span>
                            Data de nascimento
                          </span>

                          <strong>
                            {formatarData(
                              dataNascimento
                            )}
                          </strong>
                        </div>


                        <div>
                          <span>
                            Idade
                          </span>

                          <strong>
                            {idade !== ""
                              ? `${idade} anos`
                              : "Não informada"}
                          </strong>
                        </div>

                      </div>

                    </section>


                    <section className="modal-autorizacao-secao">

                      <div className="modal-autorizacao-secao-titulo">
                        <FaUserShield />

                        <h3>
                          Responsável legal
                        </h3>
                      </div>


                      <div className="modal-autorizacao-grid">

                        <div>
                          <span>
                            Nome
                          </span>

                          <strong>
                            {autorizacao.responsavelNome ||
                              "Não informado"}
                          </strong>
                        </div>


                        <div>
                          <span>
                            CPF
                          </span>

                          <strong>
                            {autorizacao.responsavelCpf ||
                              "Não informado"}
                          </strong>
                        </div>


                        <div>
                          <span>
                            Telefone
                          </span>

                          <strong>
                            {autorizacao.responsavelTelefone ||
                              "Não informado"}
                          </strong>
                        </div>


                        <div>
                          <span>
                            Parentesco
                          </span>

                          <strong>
                            {autorizacao.responsavelParentesco ||
                              "Não informado"}
                          </strong>
                        </div>

                      </div>

                    </section>


                    <section className="modal-autorizacao-secao">

                      <div className="modal-autorizacao-secao-titulo">

                        <FaFileSignature />

                        <h3>
                          Registro da autorização
                        </h3>

                      </div>


                      <div className="modal-autorizacao-grid">

                        <div>
                          <span>
                            Data
                          </span>

                          <strong>
                            {formatarDataHora(
                              autorizacao.dataAutorizacaoResponsavel
                            )}
                          </strong>
                        </div>


                        <div>
                          <span>
                            Versão do termo
                          </span>

                          <strong>
                            {autorizacao.versaoTermoResponsavel ||
                              "1.0"}
                          </strong>
                        </div>


                        <div>
                          <span>
                            Autorização
                          </span>

                          <strong>
                            {autorizacao.responsavelAutorizou
                              ? "Confirmada"
                              : "Não confirmada"}
                          </strong>
                        </div>

                      </div>

                    </section>


                    <section className="modal-autorizacao-secao">

                      <div className="modal-autorizacao-secao-titulo">

                        <FaFileSignature />

                        <h3>
                          Termo de autorização
                        </h3>

                      </div>


                      <div className="modal-termo-texto">
                        {obterTermoCompleto(
                          anamnese
                        )
                          .split("\n")
                          .map(
                            (paragrafo, index) => (
                              <p
                                key={index}
                              >
                                {paragrafo ||
                                  "\u00A0"}
                              </p>
                            )
                          )}
                      </div>

                    </section>


                    <section className="modal-autorizacao-secao">

                      <div className="modal-autorizacao-secao-titulo">

                        <FaFileSignature />

                        <h3>
                          Assinatura do responsável
                        </h3>

                      </div>


                      {autorizacao.responsavelAssinatura ? (

                        <div className="modal-assinatura">

                          <img
                            src={
                              autorizacao.responsavelAssinatura
                            }
                            alt="Assinatura eletrônica do responsável"
                          />

                        </div>

                      ) : (

                        <p className="sem-assinatura">
                          Nenhuma assinatura registrada.
                        </p>

                      )}

                    </section>

                  </>
                );
              })()}

            </div>


            <div className="modal-autorizacao-footer">

              <button
                type="button"
                className="btn-modal-secundario"
                onClick={() =>
                  setAutorizacaoSelecionada(null)
                }
              >
                Fechar
              </button>


              <button
                type="button"
                className="btn-modal-pdf"
                onClick={() =>
                  gerarPdf(
                    autorizacaoSelecionada
                  )
                }
                disabled={
                  gerandoPdf ===
                  autorizacaoSelecionada.id
                }
              >
                <FaFilePdf />

                {gerandoPdf ===
                autorizacaoSelecionada.id
                  ? "Gerando PDF..."
                  : "Gerar PDF"}
              </button>


              <button
                type="button"
                className="btn-modal-anamnese"
                onClick={() => {
                  const id =
                    autorizacaoSelecionada.id;

                  setAutorizacaoSelecionada(
                    null
                  );

                  navigate(
                    `/admin/anamnese/${id}`
                  );
                }}
              >
                <FaFileSignature />
                Ver anamnese
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}