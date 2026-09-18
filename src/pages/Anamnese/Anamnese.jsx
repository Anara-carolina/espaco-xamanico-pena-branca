import "./Anamnese.css";

import logo from "../../assets/imagens/logonome.png";

import { useState, useRef, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import {
  salvarAnamnese,
  salvarAutorizacaoMenor,
  vincularAutorizacaoMenor
} from "../../services/firebaseService";
import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaArrowLeft,
  FaArrowRight
} from "react-icons/fa";


function Anamnese() {

  const [usuario] = useAuthState(auth);
  const navigate = useNavigate();

  // =====================================================
  // ETAPA ATUAL
  // =====================================================

  const [etapa, setEtapa] = useState(1);

  const [mostrarAutorizacao, setMostrarAutorizacao] = useState(false);
  const [menorSemAutorizacao, setMenorSemAutorizacao] = useState(false);

  const canvasAssinaturaRef = useRef(null);
  const desenhandoAssinaturaRef = useRef(false);


  // =====================================================
  // ESTADO INICIAL DO FORMULÁRIO
  // =====================================================

  const formularioInicial = {

    // DADOS PESSOAIS
    nome: "",
    cpf: "",
    email: "",
    nascimento: "",
    telefone: "",
    cidade: "",

    // CONTATO DE EMERGÊNCIA
    contatoEmergencia: "",
    telefoneEmergencia: "",
    parentesco: "",

    // SAÚDE FÍSICA
    pressao: "",
    diabetes: "",
    problemaCardiaco: "",
    arritmia: "",
    epilepsia: "",
    convulsoes: "",
    desmaios: "",
    problemaRespiratorio: "",
    doencas: "",

    // NEURODIVERGÊNCIAS
    tdah: "",
    autismo: "",
    outraNeurodivergencia: "",

    // SAÚDE MENTAL
    depressao: "",
    ansiedade: "",
    panico: "",
    toc: "",
    esquizofreniaPsicose: "",
    outraCondicaoMental: "",

    // HISTÓRICO EMOCIONAL E PSIQUIÁTRICO
    crisePanico: "",
    alucinacoes: "",
    historicoFamiliarPsiquiatrico: "",
    usaMedicacao: "",
    qualMedicacao: "",
    estadoEmocional: "",
    qualidadeSono: "",

    // SUBSTÂNCIAS
    alcool: "",
    nicotina: "",
    cannabis: "",
    outrasSubstancias: "",
    substanciasQuais: "",

    // MEDICINAS
    medicinasConsagradas: [],
    outrasMedicinas: "",
    experienciaMedicinas: "",
    reacaoMedicinas: "",

    // CERIMÔNIA
    cerimoniaData: "",
    primeiraVez: "",
    intencao: "",
    receios: "",

    // CONSENTIMENTO
    aceitouTermos: false,

    // AUTORIZAÇÃO PARA MENOR DE IDADE
    menorIdade: false,
    idadeNoEnvio: null,
    responsavelNome: "",
    responsavelCpf: "",
    responsavelTelefone: "",
    responsavelParentesco: "",
    responsavelAssinatura: "",
    responsavelAutorizou: false,
    responsavelParticiparaCerimonia: false,
    dataAutorizacaoResponsavel: null,
    versaoTermoResponsavel: "1.0",
    autorizacaoMenorId: ""
  };


  const [formulario, setFormulario] =
    useState(formularioInicial);


  // =====================================================
  // TOTAL DE ETAPAS
  // =====================================================

  const totalEtapas = 10;


  // =====================================================
  // MENSAGEM DE ERRO
  // =====================================================

  const [erroFormulario, setErroFormulario] =
    useState("");


  // =====================================================
  // CALCULAR IDADE
  // =====================================================

  function calcularIdade(dataNascimento) {

    if (!dataNascimento) {
      return null;
    }

    const hoje = new Date();
    const [ano, mes, dia] = dataNascimento.split("-").map(Number);

    let idade = hoje.getFullYear() - ano;

    const aniversarioAindaNaoChegou =
      hoje.getMonth() + 1 < mes ||
      (
        hoje.getMonth() + 1 === mes &&
        hoje.getDate() < dia
      );

    if (aniversarioAindaNaoChegou) {
      idade--;
    }

    return idade;
  }


  // =====================================================
  // ATUALIZAR CAMPOS
  // =====================================================

  function atualizarCampo(e) {

    setErroFormulario("");

    const {
      name,
      value,
      type,
      checked
    } = e.target;


    // =================================================
    // CHECKBOX DAS MEDICINAS
    // =================================================

    if (
      type === "checkbox" &&
      name === "medicinasConsagradas"
    ) {

      setFormulario((estadoAnterior) => {

        const listaAtual =
          estadoAnterior.medicinasConsagradas || [];


        if (checked) {

          if (listaAtual.includes(value)) {
            return estadoAnterior;
          }

          return {
            ...estadoAnterior,
            medicinasConsagradas: [
              ...listaAtual,
              value
            ]
          };
        }


        return {
          ...estadoAnterior,
          medicinasConsagradas:
            listaAtual.filter(
              (item) => item !== value
            )
        };

      });

      return;
    }


    // =================================================
    // OUTROS CHECKBOXES
    // =================================================

    if (type === "checkbox") {

      setFormulario((estadoAnterior) => ({
        ...estadoAnterior,
        [name]: checked
      }));

      return;
    }


    // =================================================
    // DATA DE NASCIMENTO
    // Se a data for alterada, a autorização anterior
    // deixa de ser considerada válida.
    // =================================================

    if (name === "nascimento") {

      setFormulario((estadoAnterior) => ({
        ...estadoAnterior,
        [name]: value,
        menorIdade: false,
        idadeNoEnvio: null,
        responsavelNome: "",
        responsavelCpf: "",
        responsavelTelefone: "",
        responsavelParentesco: "",
        responsavelAssinatura: "",
        responsavelAutorizou: false,
        responsavelParticiparaCerimonia: false,
        dataAutorizacaoResponsavel: null,
        versaoTermoResponsavel: "1.0",
        autorizacaoMenorId: ""
      }));

      setMostrarAutorizacao(false);
      setMenorSemAutorizacao(false);

      return;
    }


    // =================================================
    // CAMPOS NORMAIS / SELECT
    // =================================================

    setFormulario((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: value
    }));

  }


  // =====================================================
  // ASSINATURA DIGITAL
  // =====================================================

  function obterPosicaoAssinatura(event) {

    const canvas = canvasAssinaturaRef.current;

    if (!canvas) {
      return { x: 0, y: 0 };
    }

    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }


  function iniciarAssinatura(event) {

    const canvas = canvasAssinaturaRef.current;

    if (!canvas) {
      return;
    }

    event.preventDefault();

    const posicao = obterPosicaoAssinatura(event);
    const contexto = canvas.getContext("2d");

    desenhandoAssinaturaRef.current = true;

    contexto.beginPath();
    contexto.moveTo(posicao.x, posicao.y);

    canvas.setPointerCapture(event.pointerId);
  }


  function desenharAssinatura(event) {

    if (!desenhandoAssinaturaRef.current) {
      return;
    }

    const canvas = canvasAssinaturaRef.current;

    if (!canvas) {
      return;
    }

    event.preventDefault();

    const posicao = obterPosicaoAssinatura(event);
    const contexto = canvas.getContext("2d");

    contexto.lineTo(posicao.x, posicao.y);
    contexto.stroke();
  }


  function finalizarAssinatura(event) {

    desenhandoAssinaturaRef.current = false;

    if (
      canvasAssinaturaRef.current &&
      event.pointerId !== undefined
    ) {
      try {
        canvasAssinaturaRef.current.releasePointerCapture(
          event.pointerId
        );
      } catch (error) {
        console.debug(
          "Não foi possível liberar o ponteiro da assinatura.",
          error
        );
      }
    }
  }


  function limparAssinatura() {

    const canvas = canvasAssinaturaRef.current;

    if (!canvas) {
      return;
    }

    const contexto = canvas.getContext("2d");

    contexto.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    setFormulario((estadoAnterior) => ({
      ...estadoAnterior,
      responsavelAssinatura: "",
      responsavelAutorizou: false
    }));

    setErroFormulario("");
  }


  function assinaturaFoiPreenchida() {

    const canvas = canvasAssinaturaRef.current;

    if (!canvas) {
      return false;
    }

    const dados = canvas
      .getContext("2d")
      .getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      )
      .data;

    for (let i = 3; i < dados.length; i += 4) {
      if (dados[i] !== 0) {
        return true;
      }
    }

    return false;
  }


  async function confirmarAutorizacao() {

    setErroFormulario("");

    if (!formulario.responsavelNome.trim()) {
      setErroFormulario(
        "Informe o nome completo do responsável legal."
      );
      return;
    }

    if (!formulario.responsavelCpf.trim()) {
      setErroFormulario(
        "Informe o CPF do responsável legal."
      );
      return;
    }

    if (!formulario.responsavelTelefone.trim()) {
      setErroFormulario(
        "Informe o telefone ou WhatsApp do responsável legal."
      );
      return;
    }

    if (!formulario.responsavelParentesco.trim()) {
      setErroFormulario(
        "Informe o parentesco ou vínculo com o menor."
      );
      return;
    }

    if (!formulario.responsavelParticiparaCerimonia) {
      setErroFormulario(
        "Para continuar, o responsável que realizar a autorização deverá permanecer presente durante a atividade."
      );
      return;
    }

    if (!assinaturaFoiPreenchida()) {
      setErroFormulario(
        "Faça a assinatura do responsável no campo indicado."
      );
      return;
    }

    if (!formulario.responsavelAutorizou) {
      setErroFormulario(
        "É necessário aceitar o termo de autorização."
      );
      return;
    }

    if (!usuario) {
      setErroFormulario(
        "É necessário estar conectado para registrar a autorização."
      );
      return;
    }

    const canvas = canvasAssinaturaRef.current;

    if (!canvas) {
      setErroFormulario(
        "Não foi possível acessar o campo de assinatura."
      );
      return;
    }

    const assinatura = canvas.toDataURL("image/png");
    const idade = calcularIdade(formulario.nascimento);

    if (idade === null || idade < 12 || idade >= 18) {
      setErroFormulario(
        "A autorização é válida somente para menores entre 12 e 17 anos."
      );
      return;
    }

    try {

      let autorizacaoId = formulario.autorizacaoMenorId || "";

      if (!autorizacaoId) {

        autorizacaoId = await salvarAutorizacaoMenor({

          usuarioId: usuario.uid,

          emailUsuario:
            formulario.email ||
            usuario.email ||
            "",

          nomeMenor: formulario.nome || "",

          idadeMenor: idade,

          dataNascimentoMenor:
            formulario.nascimento || "",

          nomeResponsavel:
            formulario.responsavelNome.trim(),

          cpfResponsavel:
            formulario.responsavelCpf.trim(),

          telefoneResponsavel:
            formulario.responsavelTelefone.trim(),

          parentesco:
            formulario.responsavelParentesco.trim(),

          assinatura:
            assinatura,

          autorizou: true,

          participaraCerimonia: true,

          dataAutorizacao:
            new Date().toISOString(),

          versaoTermo:
            "1.0"

        });
      }

      setFormulario((estadoAnterior) => ({
        ...estadoAnterior,
        menorIdade: true,
        idadeNoEnvio: idade,
        responsavelAssinatura: assinatura,
        responsavelAutorizou: true,
        responsavelParticiparaCerimonia: true,
        dataAutorizacaoResponsavel:
          estadoAnterior.dataAutorizacaoResponsavel ||
          new Date().toISOString(),
        versaoTermoResponsavel: "1.0",
        autorizacaoMenorId: autorizacaoId
      }));

      setMostrarAutorizacao(false);
      setMenorSemAutorizacao(false);
      setEtapa(2);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    } catch (error) {

      console.error(
        "ERRO AO SALVAR AUTORIZAÇÃO DO MENOR:",
        error
      );

      setErroFormulario(
        "Não foi possível registrar a autorização. Verifique sua conexão e tente novamente."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  }


  function voltarDaAutorizacao() {

    setMostrarAutorizacao(false);
    setMenorSemAutorizacao(false);
    setErroFormulario("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  // =====================================================
  // PREPARAR CANVAS DA ASSINATURA
  // =====================================================

  useEffect(() => {

    if (!mostrarAutorizacao) {
      return;
    }

    const canvas = canvasAssinaturaRef.current;

    if (!canvas) {
      return;
    }

    const largura = canvas.clientWidth || 700;
    const altura = 220;
    const proporcao = window.devicePixelRatio || 1;

    canvas.width = largura * proporcao;
    canvas.height = altura * proporcao;

    const contexto = canvas.getContext("2d");

    contexto.scale(
      proporcao,
      proporcao
    );

    contexto.lineWidth = 2;
    contexto.lineCap = "round";
    contexto.lineJoin = "round";
    contexto.strokeStyle = "#24382a";

  }, [mostrarAutorizacao]);


  // =====================================================
  // AVANÇAR ETAPA
  // =====================================================

  function proximaEtapa() {

    // A data de nascimento é obrigatória porque
    // determina o fluxo de idade.

    if (etapa === 1) {

      const camposObrigatorios = [
        {
          campo: formulario.nome,
          mensagem: "Informe seu nome completo antes de continuar."
        },
        {
          campo: formulario.cpf,
          mensagem: "Informe seu CPF antes de continuar."
        },
        {
          campo: formulario.email,
          mensagem: "Informe seu e-mail antes de continuar."
        },
        {
          campo: formulario.nascimento,
          mensagem: "Informe sua data de nascimento antes de continuar."
        },
        {
          campo: formulario.telefone,
          mensagem: "Informe seu telefone ou WhatsApp antes de continuar."
        },
        {
          campo: formulario.cidade,
          mensagem: "Informe sua cidade antes de continuar."
        }
      ];

      const campoNaoPreenchido = camposObrigatorios.find(
        ({ campo }) => !String(campo || "").trim()
      );

      if (campoNaoPreenchido) {

        setErroFormulario(campoNaoPreenchido.mensagem);

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        return;
      }

      if (!formulario.nascimento) {

        setErroFormulario(
          "Informe sua data de nascimento antes de continuar."
        );

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        return;
      }

      const idade = calcularIdade(
        formulario.nascimento
      );

      if (idade < 0) {

        setErroFormulario(
          "Informe uma data de nascimento válida."
        );

        return;
      }

      if (idade < 12) {

        setMenorSemAutorizacao(true);
        setMostrarAutorizacao(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        return;
      }

      if (
        idade >= 12 &&
        idade < 18
      ) {

        if (
          !formulario.responsavelAssinatura ||
          !formulario.responsavelAutorizou
        ) {

          setMostrarAutorizacao(true);
          setMenorSemAutorizacao(false);

          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });

          return;
        }
      }

    }


    // A medicação precisa ser respondida antes
    // de sair da etapa 6.

    if (etapa === 6) {

      if (!formulario.usaMedicacao) {

        setErroFormulario(
          "Informe se faz uso de alguma medicação antes de continuar."
        );

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        return;
      }


      if (
        formulario.usaMedicacao === "Sim" &&
        !formulario.qualMedicacao.trim()
      ) {

        setErroFormulario(
          "Informe qual medicação você utiliza antes de continuar."
        );

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        return;
      }

    }


    if (etapa < totalEtapas) {

      setErroFormulario("");

      setEtapa(
        (valor) => valor + 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }

  }


  // =====================================================
  // VOLTAR ETAPA
  // =====================================================

  function etapaAnterior() {

    setErroFormulario("");

    if (etapa > 1) {

      setEtapa(
        (valor) => valor - 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }

  }


  // =====================================================
  // ENVIAR FORMULÁRIO
  // =====================================================

  async function enviarFormulario(e) {

    e.preventDefault();


    if (!usuario) {

      alert(
        "Você precisa estar logado para enviar a ficha."
      );

      return;
    }


    // Validação de segurança da etapa 6

    if (!formulario.usaMedicacao) {

      setEtapa(6);

      setErroFormulario(
        "Informe se faz uso de alguma medicação antes de continuar."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      return;
    }


    if (
      formulario.usaMedicacao === "Sim" &&
      !formulario.qualMedicacao.trim()
    ) {

      setEtapa(6);

      setErroFormulario(
        "Informe qual medicação você utiliza antes de continuar."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      return;
    }


    if (!formulario.aceitouTermos) {

      alert(
        "É necessário aceitar o termo de consentimento."
      );

      return;
    }


    const idade = calcularIdade(
      formulario.nascimento
    );

    if (
      idade !== null &&
      idade >= 12 &&
      idade < 18 &&
      (
        !formulario.responsavelAssinatura ||
        !formulario.responsavelAutorizou ||
        !formulario.responsavelParticiparaCerimonia
      )
    ) {

      setMostrarAutorizacao(true);
      setEtapa(1);

      setErroFormulario(
        "A autorização do responsável legal é obrigatória para concluir a ficha."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      return;
    }


    const dadosAnamnese = {

      usuarioId: usuario.uid,

      nomeUsuario:
        formulario.nome ||
        usuario.displayName,

      emailUsuario:
        formulario.email ||
        usuario.email,

      dataEnvio: new Date(),

      ...formulario,

      autorizacaoMenor: formulario.menorIdade
        ? {
            nomeResponsavel:
              formulario.responsavelNome,
            cpfResponsavel:
              formulario.responsavelCpf,
            telefoneResponsavel:
              formulario.responsavelTelefone,
            parentesco:
              formulario.responsavelParentesco,
            assinatura:
              formulario.responsavelAssinatura,
            autorizou:
              formulario.responsavelAutorizou,
            participaraCerimonia:
              formulario.responsavelParticiparaCerimonia,
            dataAutorizacao:
              formulario.dataAutorizacaoResponsavel,
            versaoTermo:
              formulario.versaoTermoResponsavel
          }
        : null
    };


    try {

      const anamneseId = await salvarAnamnese(
        dadosAnamnese
      );

      if (
        formulario.menorIdade &&
        formulario.autorizacaoMenorId
      ) {

        await vincularAutorizacaoMenor(
          formulario.autorizacaoMenorId,
          anamneseId
        );

      }

      alert(
        "Ficha enviada com sucesso."
      );


      setFormulario(
        formularioInicial
      );

      setEtapa(1);
      setMostrarAutorizacao(false);
      setMenorSemAutorizacao(false);

      setErroFormulario("");

    } catch (error) {

      console.error(
        "ERRO AO SALVAR ANAMNESE:",
        error
      );


      alert(
        "Erro ao salvar ficha."
      );

    }

  }


  // =====================================================
  // COMPONENTE DE OPÇÕES PADRÃO
  // =====================================================

  function CampoSelecao({
    label,
    name
  }) {

    return (

      <div className="campo-pergunta">

        <label>
          {label}
        </label>

        <select
          name={name}
          value={formulario[name] || ""}
          onChange={atualizarCampo}
        >

          <option value="">
            Selecione
          </option>

          <option value="Sim">
            Sim
          </option>

          <option value="Não">
            Não
          </option>

        </select>

      </div>

    );

  }


  // =====================================================
  // TELA DE AUTORIZAÇÃO DO RESPONSÁVEL
  // =====================================================

  function renderAutorizacaoMenor() {

    if (!mostrarAutorizacao) {
      return null;
    }

    const idade = calcularIdade(
      formulario.nascimento
    );

    return (

      <main className="anamnese tela-autorizacao-menor">

        <section className="autorizacao-menor-card">

          <div className="autorizacao-menor-topo">

            <h1>
              Autorização para participação de menor
            </h1>

            <p>
              A pessoa identificada nesta ficha possui {idade} anos.
              Antes de continuar a anamnese, é necessário que o pai,
              a mãe ou o responsável legal realize a autorização.
            </p>

          </div>


          <div className="autorizacao-menor-aviso">

            <strong>
              Importante
            </strong>

            <p>
              Esta autorização é um procedimento interno do
              Espaço Xamânico Pena Branca para participação de
              adolescentes entre 12 e 17 anos.
            </p>

            <p>
              Como condição estabelecida pelo Espaço, o responsável
              que realizar esta autorização deverá permanecer presente
              durante toda a atividade da qual o menor participar.
            </p>

          </div>


          {erroFormulario && (

            <div
              className="erro-formulario"
              role="alert"
            >
              {erroFormulario}
            </div>

          )}


          <section className="autorizacao-menor-secao">

            <h2>
              Dados do responsável legal
            </h2>

            <input
              name="responsavelNome"
              placeholder="Nome completo do responsável"
              value={formulario.responsavelNome}
              onChange={atualizarCampo}
              autoComplete="name"
            />

            <input
              name="responsavelCpf"
              placeholder="CPF do responsável"
              value={formulario.responsavelCpf}
              onChange={atualizarCampo}
              inputMode="numeric"
            />

            <input
              name="responsavelTelefone"
              placeholder="Telefone / WhatsApp"
              value={formulario.responsavelTelefone}
              onChange={atualizarCampo}
              inputMode="tel"
            />

            <input
              name="responsavelParentesco"
              placeholder="Parentesco ou vínculo com o menor"
              value={formulario.responsavelParentesco}
              onChange={atualizarCampo}
            />

          </section>


          <section className="autorizacao-menor-secao">

            <h2>
              Termo de autorização
            </h2>

            <div className="texto-termo-responsavel">

              <p>
                Eu, na condição de pai, mãe ou responsável legal
                pelo menor identificado nesta ficha, declaro que
                autorizo sua participação na atividade indicada,
                após ter recebido as orientações disponibilizadas
                pelo Espaço Xamânico Pena Branca.
              </p>

              <p>
                Declaro que as informações fornecidas são verdadeiras
                e que comunicarei ao Espaço qualquer informação
                relevante que possa ser alterada antes da participação
                do menor.
              </p>

              <p>
                Declaro ciência de que esta autorização não substitui
                orientações ou avaliações de profissionais de saúde
                quando estas forem necessárias.
              </p>

              <p>
                Declaro ainda ciência da regra interna do Espaço de
                que o responsável que realizar esta autorização deverá
                permanecer presente durante toda a atividade da qual
                o menor participar.
              </p>

            </div>


            <label
              className="check-termo"
              htmlFor="responsavelParticiparaCerimonia"
            >

              <input
                id="responsavelParticiparaCerimonia"
                type="checkbox"
                name="responsavelParticiparaCerimonia"
                checked={Boolean(
                  formulario.responsavelParticiparaCerimonia
                )}
                onChange={(e) => {
                  setFormulario((estadoAnterior) => ({
                    ...estadoAnterior,
                    responsavelParticiparaCerimonia: e.target.checked
                  }));
                  setErroFormulario("");
                }}
              />

              <span>
                Declaro que permanecerei presente durante toda a
                atividade da qual o menor participar.
              </span>

            </label>


            <label
              className="check-termo"
              htmlFor="responsavelAutorizou"
            >

              <input
                id="responsavelAutorizou"
                type="checkbox"
                name="responsavelAutorizou"
                checked={Boolean(
                  formulario.responsavelAutorizou
                )}
                onChange={(e) => {
                  setFormulario((estadoAnterior) => ({
                    ...estadoAnterior,
                    responsavelAutorizou: e.target.checked
                  }));
                  setErroFormulario("");
                }}
              />

              <span>
                Li o termo acima, sou responsável legal pelo menor
                e autorizo sua participação nas condições informadas.
              </span>

            </label>

          </section>


          <section className="autorizacao-menor-secao">

            <h2>
              Assinatura do responsável
            </h2>

            <p className="descricao-etapa">
              Desenhe sua assinatura no campo abaixo usando o mouse,
              touchpad ou o dedo na tela do celular.
            </p>

            <div className="area-assinatura">

              <canvas
                ref={canvasAssinaturaRef}
                className="canvas-assinatura"
                onPointerDown={iniciarAssinatura}
                onPointerMove={desenharAssinatura}
                onPointerUp={finalizarAssinatura}
                onPointerCancel={finalizarAssinatura}
                onPointerLeave={finalizarAssinatura}
                aria-label="Campo para assinatura do responsável"
              />

              <div className="linha-assinatura">
                Assinatura do responsável
              </div>

            </div>

            <button
              type="button"
              className="btn-limpar-assinatura"
              onClick={limparAssinatura}
            >
              Limpar assinatura
            </button>

          </section>


          <div className="autorizacao-menor-botoes">

            <button
              type="button"
              className="btn-voltar"
              onClick={voltarDaAutorizacao}
            >
              Voltar
            </button>

            <button
              type="button"
              className="btn-proximo"
              onClick={confirmarAutorizacao}
            >
              Confirmar autorização
            </button>

          </div>

          <p className="versao-termo-responsavel">
            Termo de autorização — versão 1.0
          </p>

        </section>

      </main>

    );
  }


  // =====================================================
  // TELA PARA MENORES DE 12 ANOS
  // =====================================================

  function renderMenorSemAutorizacao() {

    if (!menorSemAutorizacao) {
      return null;
    }

    return (

      <main className="anamnese tela-menor-sem-autorizacao">

        <section className="menor-sem-autorizacao-card">

          <img
            src={logo}
            alt="Espaço Xamânico Pena Branca"
            className="logo-anamnese"
          />

          <h1>
            Orientação necessária
          </h1>

          <p>
            A ficha online não pode prosseguir automaticamente
            para pessoas menores de 12 anos.
          </p>

          <p>
            Para avaliar a possibilidade de participação e orientar
            sobre os próximos passos, é necessário entrar em contato
            diretamente com o facilitador responsável pelo Espaço
            Xamânico Pena Branca.
          </p>

          <p>
            A análise será realizada de acordo com a situação
            específica da criança e com as orientações do Espaço.
          </p>

          <button
            type="button"
            className="btn-proximo"
            onClick={() => navigate("/")}
          >
            Voltar para o site
          </button>

          <button
            type="button"
            className="btn-voltar"
            onClick={() => {
              setMenorSemAutorizacao(false);
              setErroFormulario("");
            }}
          >
            Corrigir data de nascimento
          </button>

        </section>

      </main>

    );
  }


  // =====================================================
  // RENDERIZAÇÃO DA ETAPA
  // =====================================================

  function renderEtapa() {


    // ===================================================
    // ETAPA 1
    // DADOS PESSOAIS
    // ===================================================

    if (etapa === 1) {

      return (

        <section className="campo-grupo">

          <h2>
            Dados pessoais
          </h2>

          <p className="descricao-etapa">
            Conte um pouco sobre você para iniciarmos sua ficha.
          </p>


          <input
            name="nome"
            placeholder="Nome completo"
            value={formulario.nome}
            onChange={atualizarCampo}
            required
          />


          <input
            name="cpf"
            placeholder="CPF"
            value={formulario.cpf}
            onChange={atualizarCampo}
            required
          />


          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={formulario.email}
            onChange={atualizarCampo}
            required
          />


          <div className="campo-pergunta">

            <label>
              Data de nascimento
            </label>

            <input
              name="nascimento"
              type="date"
              value={formulario.nascimento}
              onChange={atualizarCampo}
              required
            />

          </div>


          <input
            name="telefone"
            placeholder="Telefone / WhatsApp"
            value={formulario.telefone}
            onChange={atualizarCampo}
            required
          />


          <input
            name="cidade"
            placeholder="Cidade onde reside"
            value={formulario.cidade}
            onChange={atualizarCampo}
            required
          />

        </section>

      );

    }


    // ===================================================
    // ETAPA 2
    // CONTATO DE EMERGÊNCIA
    // ===================================================

    if (etapa === 2) {

      return (

        <section className="campo-grupo">

          <h2>
            Contato de emergência
          </h2>

          <p className="descricao-etapa">
            Informe alguém que possa ser contatado caso seja necessário.
          </p>


          <input
            name="contatoEmergencia"
            placeholder="Nome do contato"
            value={formulario.contatoEmergencia}
            onChange={atualizarCampo}
          />


          <input
            name="telefoneEmergencia"
            placeholder="Telefone do contato"
            value={formulario.telefoneEmergencia}
            onChange={atualizarCampo}
          />


          <input
            name="parentesco"
            placeholder="Grau de parentesco ou relação"
            value={formulario.parentesco}
            onChange={atualizarCampo}
          />

        </section>

      );

    }


    // ===================================================
    // ETAPA 3
    // SAÚDE FÍSICA
    // ===================================================

    if (etapa === 3) {

      return (

        <section className="campo-grupo">

          <h2>
            Saúde física
          </h2>

          <p className="descricao-etapa">
            Informe condições de saúde atuais ou anteriores que
            possam ser importantes para sua participação.
          </p>


          <CampoSelecao
            label="Pressão alta / hipertensão"
            name="pressao"
          />


          <CampoSelecao
            label="Diabetes"
            name="diabetes"
          />


          <CampoSelecao
            label="Doença cardíaca"
            name="problemaCardiaco"
          />


          <CampoSelecao
            label="Arritmia ou alteração do ritmo cardíaco"
            name="arritmia"
          />


          <CampoSelecao
            label="Epilepsia"
            name="epilepsia"
          />


          <CampoSelecao
            label="Convulsões"
            name="convulsoes"
          />


          <CampoSelecao
            label="Histórico de desmaios"
            name="desmaios"
          />


          <CampoSelecao
            label="Problemas respiratórios importantes"
            name="problemaRespiratorio"
          />


          <textarea
            name="doencas"
            placeholder="Outras doenças ou condições de saúde importantes"
            value={formulario.doencas}
            onChange={atualizarCampo}
          />

        </section>

      );

    }


    // ===================================================
    // ETAPA 4
    // NEURODIVERGÊNCIAS
    // ===================================================

    if (etapa === 4) {

      return (

        <section className="campo-grupo">

          <h2>
            Neurodivergências
          </h2>

          <p className="descricao-etapa">
            Informe diagnósticos, suspeitas ou avaliações que considere
            importantes. Você também pode escolher não informar.
          </p>


          <CampoSelecao
            label="TDAH"
            name="tdah"
          />


          <CampoSelecao
            label="Autismo (TEA)"
            name="autismo"
          />


          <textarea
            name="outraNeurodivergencia"
            placeholder="Outra neurodivergência ou informação importante"
            value={formulario.outraNeurodivergencia}
            onChange={atualizarCampo}
          />

        </section>

      );

    }


    // ===================================================
    // ETAPA 5
    // SAÚDE MENTAL
    // ===================================================

    if (etapa === 5) {

      return (

        <section className="campo-grupo">

          <h2>
            Saúde mental
          </h2>

          <p className="descricao-etapa">
            Estas informações são confidenciais e ajudam a equipe
            a conhecer seu histórico antes da cerimônia.
          </p>


          <CampoSelecao
            label="Depressão"
            name="depressao"
          />


          <CampoSelecao
            label="Transtorno de ansiedade"
            name="ansiedade"
          />


          <CampoSelecao
            label="Síndrome / transtorno do pânico"
            name="panico"
          />


          <CampoSelecao
            label="TOC"
            name="toc"
          />


          <CampoSelecao
            label="Esquizofrenia ou outro transtorno psicótico"
            name="esquizofreniaPsicose"
          />


          <textarea
            name="outraCondicaoMental"
            placeholder="Outra condição ou informação relacionada à saúde mental"
            value={formulario.outraCondicaoMental}
            onChange={atualizarCampo}
          />

        </section>

      );

    }


    // ===================================================
    // ETAPA 6
    // HISTÓRICO EMOCIONAL E PSIQUIÁTRICO
    // ===================================================

    if (etapa === 6) {

      return (

        <section className="campo-grupo">

          <h2>
            Histórico emocional e psiquiátrico
          </h2>

          <p className="descricao-etapa">
            Responda apenas o que se sentir confortável em compartilhar.
          </p>


          <CampoSelecao
            label="Já teve crises de pânico?"
            name="crisePanico"
          />


          <CampoSelecao
            label="Já teve alucinações, delírios ou episódios de perda de contato com a realidade?"
            name="alucinacoes"
          />


          <textarea
            name="historicoFamiliarPsiquiatrico"
            placeholder="Existe histórico familiar relevante de condições psiquiátricas ou neurológicas?"
            value={formulario.historicoFamiliarPsiquiatrico}
            onChange={atualizarCampo}
          />


          <div className="campo-obrigatorio-destaque">

            <div className="campo-obrigatorio-titulo">
              Informação obrigatória
            </div>

            <label htmlFor="usaMedicacao">
              Faz uso de alguma medicação atualmente?
            </label>

            <select
              id="usaMedicacao"
              name="usaMedicacao"
              value={formulario.usaMedicacao}
              onChange={atualizarCampo}
              required
            >

              <option value="">
                Selecione
              </option>

              <option value="Sim">
                Sim
              </option>

              <option value="Não">
                Não
              </option>

            </select>


            {formulario.usaMedicacao === "Sim" && (

              <div className="campo-medicacao">

                <label htmlFor="qualMedicacao">
                  Se sim, qual medicação?
                </label>

                <input
                  id="qualMedicacao"
                  name="qualMedicacao"
                  type="text"
                  placeholder="Informe o nome da medicação"
                  value={formulario.qualMedicacao}
                  onChange={atualizarCampo}
                  required
                />

              </div>

            )}

          </div>


          <textarea
            name="estadoEmocional"
            placeholder="Como você está se sentindo emocionalmente atualmente?"
            value={formulario.estadoEmocional}
            onChange={atualizarCampo}
          />


          <textarea
            name="qualidadeSono"
            placeholder="Como está seu sono atualmente?"
            value={formulario.qualidadeSono}
            onChange={atualizarCampo}
          />

        </section>

      );

    }


    // ===================================================
    // ETAPA 7
    // USO DE SUBSTÂNCIAS
    // ===================================================

    if (etapa === 7) {

      return (

        <section className="campo-grupo">

          <h2>
            Uso de substâncias
          </h2>

          <p className="descricao-etapa">
            Informe seu uso atual ou histórico de substâncias,
            inclusive aquelas utilizadas com finalidade recreativa,
            terapêutica ou espiritual.
          </p>


          <CampoSelecao
            label="Álcool"
            name="alcool"
          />


          <CampoSelecao
            label="Nicotina / tabaco"
            name="nicotina"
          />


          <CampoSelecao
            label="Cannabis"
            name="cannabis"
          />


          <CampoSelecao
            label="Outras substâncias psicoativas"
            name="outrasSubstancias"
          />


          <textarea
            name="substanciasQuais"
            placeholder="Se houver, quais substâncias e com que frequência?"
            value={formulario.substanciasQuais}
            onChange={atualizarCampo}
          />

        </section>

      );

    }


    // ===================================================
    // ETAPA 8
    // MEDICINAS
    // ===================================================

    if (etapa === 8) {

      return (

        <section className="campo-grupo">

          <h2>
            Medicinas já consagradas
          </h2>

          <p className="descricao-etapa">
            Selecione as medicinas com as quais você já teve contato.
          </p>


          <div className="lista-checkboxes">

            <label>
              <input
                type="checkbox"
                name="medicinasConsagradas"
                value="Ayahuasca"
                checked={
                  formulario.medicinasConsagradas.includes(
                    "Ayahuasca"
                  )
                }
                onChange={atualizarCampo}
              />

              Ayahuasca
            </label>


            <label>
              <input
                type="checkbox"
                name="medicinasConsagradas"
                value="Rapé"
                checked={
                  formulario.medicinasConsagradas.includes(
                    "Rapé"
                  )
                }
                onChange={atualizarCampo}
              />

              Medicina do Rapé
            </label>


            <label>
              <input
                type="checkbox"
                name="medicinasConsagradas"
                value="Sananga"
                checked={
                  formulario.medicinasConsagradas.includes(
                    "Sananga"
                  )
                }
                onChange={atualizarCampo}
              />

              Sananga
            </label>


            <label>
              <input
                type="checkbox"
                name="medicinasConsagradas"
                value="Kambô"
                checked={
                  formulario.medicinasConsagradas.includes(
                    "Kambô"
                  )
                }
                onChange={atualizarCampo}
              />

              Kambô
            </label>

          </div>


          <input
            name="outrasMedicinas"
            placeholder="Outras medicinas com as quais já teve contato"
            value={formulario.outrasMedicinas}
            onChange={atualizarCampo}
          />


          <textarea
            name="experienciaMedicinas"
            placeholder="Conte como foi sua última experiência. Como você se sentiu durante e após?"
            value={formulario.experienciaMedicinas}
            onChange={atualizarCampo}
          />


          <textarea
            name="reacaoMedicinas"
            placeholder="Já teve alguma reação física ou emocional importante durante ou após uma cerimônia?"
            value={formulario.reacaoMedicinas}
            onChange={atualizarCampo}
          />

        </section>

      );

    }


    // ===================================================
    // ETAPA 9
    // CERIMÔNIA E INTENÇÃO
    // ===================================================

    if (etapa === 9) {

      return (

        <section className="campo-grupo">

          <h2>
            Sua cerimônia e sua intenção
          </h2>

          <p className="descricao-etapa">
            Estas informações ajudam a compreender o momento
            que você está vivendo e sua intenção ao participar.
          </p>


          <div className="campo-pergunta">

            <label htmlFor="cerimoniaData">
              Data da cerimônia que estará participando
            </label>

            <input
              id="cerimoniaData"
              type="date"
              name="cerimoniaData"
              value={formulario.cerimoniaData}
              onChange={atualizarCampo}
            />

          </div>


          <CampoSelecao
            label="Será sua primeira experiência com as medicinas da floresta?"
            name="primeiraVez"
          />


          <textarea
            name="intencao"
            placeholder="Conte sua intenção ao participar desta cerimônia."
            value={formulario.intencao}
            onChange={atualizarCampo}
          />


          <textarea
            name="receios"
            placeholder="Existe algum receio, medo ou preocupação que gostaria de compartilhar?"
            value={formulario.receios}
            onChange={atualizarCampo}
          />

        </section>

      );

    }


    // ===================================================
    // ETAPA 10
    // CONSENTIMENTO
    // ===================================================

    if (etapa === 10) {

      return (

        <section className="campo-grupo consentimento">

          <h2>
            Consentimento
          </h2>

          <p className="descricao-etapa">
            Leia atentamente antes de enviar sua ficha.
          </p>


          <div className="texto-consentimento">

            <p>
              Declaro que as informações fornecidas nesta ficha
              são verdadeiras e completas dentro do meu conhecimento.
            </p>


            <p>
              Comprometo-me a informar à organização qualquer
              condição de saúde, uso de medicamento ou alteração
              relevante que possa ocorrer antes da cerimônia.
            </p>


            <p>
              Estou ciente de que o preenchimento desta ficha não
              substitui avaliação ou orientação de profissionais
              de saúde quando necessária.
            </p>

          </div>


          <label
            className="check-termo"
            htmlFor="aceitouTermos"
          >

            <input
              id="aceitouTermos"
              type="checkbox"
              name="aceitouTermos"
              checked={Boolean(formulario.aceitouTermos)}
              onChange={(e) => {
                setFormulario((estadoAnterior) => ({
                  ...estadoAnterior,
                  aceitouTermos: e.target.checked
                }));
                setErroFormulario("");
              }}
              required
            />

            <span>
              Declaro que li e estou de acordo com as informações acima.
            </span>

          </label>

        </section>

      );

    }


    return null;

  }


  // =====================================================
  // TELA
  // =====================================================

  if (mostrarAutorizacao) {
    return renderAutorizacaoMenor();
  }

  if (menorSemAutorizacao) {
    return renderMenorSemAutorizacao();
  }


  return (

    <main className="anamnese">

      {/* =================================================
          CABEÇALHO
      ================================================= */}

      <section className="anamnese-header">

        <button
          type="button"
          className="btn-home"
          onClick={() => navigate("/")}
          aria-label="Voltar para Home"
        >
          <FaHome />
        </button>


        {usuario && (

          <>

            <div className="linha-separadora"></div>


            <div className="usuario-logado">

              {usuario.photoURL && (

                <img
                  src={usuario.photoURL}
                  alt="Usuário"
                />

              )}


              <div>

                <strong>
                  Olá, {usuario.displayName}
                </strong>

                <span>
                  {usuario.email}
                </span>

              </div>

            </div>

          </>

        )}


        <img
          src={logo}
          alt="Espaço Xamânico Pena Branca"
          className="logo-anamnese"
        />


        <h1>
          Ficha de Anamnese
        </h1>


        <p>
          Esta ficha tem como objetivo conhecer sua história,
          sua saúde e sua intenção antes da participação nas cerimônias.
          Todas as informações são tratadas com respeito e cuidado.
        </p>

      </section>


      {/* =================================================
          INDICADOR DE ETAPAS
      ================================================= */}

      <div className="progresso-anamnese">

        <span>
          Etapa {etapa} de {totalEtapas}
        </span>


        <div className="barra-progresso">

          <div
            className="barra-progresso-preenchida"
            style={{
              width: `${(etapa / totalEtapas) * 100}%`
            }}
          />

        </div>

      </div>


      {/* =================================================
          FORMULÁRIO
      ================================================= */}

      <form
        className="form-anamnese"
        onSubmit={enviarFormulario}
      >

        {erroFormulario && (

          <div
            className="erro-formulario"
            role="alert"
          >
            {erroFormulario}
          </div>

        )}


        {renderEtapa()}


        {/* =================================================
            NAVEGAÇÃO
        ================================================= */}

        <div className="navegacao-anamnese">

          {etapa > 1 && (

            <button
              type="button"
              className="btn-voltar"
              onClick={etapaAnterior}
            >

              <FaArrowLeft />

              Voltar

            </button>

          )}


          {etapa < totalEtapas && (

            <button
              type="button"
              className="btn-proximo"
              onClick={proximaEtapa}
            >

              Próximo

              <FaArrowRight />

            </button>

          )}


          {etapa === totalEtapas && (

            <button
              type="submit"
              className="btn-enviar"
            >
              Enviar minha ficha
            </button>

          )}

        </div>

      </form>


      {/* =================================================
          HAUX HAUX
      ================================================= */}

      <div
        className="haux-final"
        aria-label="Haux Haux"
      >
        Haux Haux
      </div>

    </main>

  );

}

export default Anamnese;
