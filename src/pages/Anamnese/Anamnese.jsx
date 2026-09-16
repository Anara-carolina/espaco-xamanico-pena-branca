import "./Anamnese.css";

import logo from "../../assets/imagens/logonome.png";

import { useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";

import { salvarAnamnese } from "../../services/firebaseService";

import { useNavigate } from "react-router-dom";

import { FaHome, FaArrowLeft, FaArrowRight } from "react-icons/fa";


function Anamnese() {

  const [usuario] = useAuthState(auth);

  const navigate = useNavigate();


  // =====================================================
  // ETAPA ATUAL
  // =====================================================

  const [etapa, setEtapa] = useState(1);


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
    profissao: "",

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
    problemaHepatico: "",
    problemaRenal: "",
    cirurgias: "",
    doencas: "",
    medicamentos: "",
    alergias: "",

    // NEURODIVERGÊNCIAS
    tdah: "",
    autismo: "",
    dislexia: "",
    discalculia: "",
    altasHabilidades: "",
    outraNeurodivergencia: "",

    // SAÚDE MENTAL
    depressao: "",
    ansiedade: "",
    panico: "",
    toc: "",
    tept: "",
    transtornoBipolar: "",
    esquizofreniaPsicose: "",
    transtornoAlimentar: "",
    outraCondicaoMental: "",

    // HISTÓRICO PSIQUIÁTRICO
    crisePanico: "",
    maniaHipomania: "",
    alucinacoes: "",
    internacaoPsiquiatrica: "",
    acompanhamentoPsiquiatrico: "",
    acompanhamentoPsicologico: "",
    medicamentosPsiquiatricos: "",
    historicoFamiliarPsiquiatrico: "",
    estadoEmocional: "",
    qualidadeSono: "",

    // SUBSTÂNCIAS
    alcool: "",
    nicotina: "",
    cannabis: "",
    outrasSubstancias: "",
    substanciasQuais: "",
    ultimaUtilizacao: "",

    // MEDICINAS
    medicinasConsagradas: [],
    outrasMedicinas: "",
    experienciaMedicinas: "",
    reacaoMedicinas: "",

    // CERIMÔNIA
    cerimoniaData: "",
    tipoCerimonia: "",
    primeiraVez: "",
    intencao: "",
    expectativas: "",
    receios: "",

    // CONSENTIMENTO
    aceitouTermos: false

  };


  const [formulario, setFormulario] =
    useState(formularioInicial);


  // =====================================================
  // TOTAL DE ETAPAS
  // =====================================================

  const totalEtapas = 10;


  // =====================================================
  // ATUALIZAR CAMPOS
  // =====================================================

  function atualizarCampo(e) {

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
    // CAMPOS NORMAIS / RADIO / SELECT
    // =================================================

    setFormulario((estadoAnterior) => ({

      ...estadoAnterior,

      [name]: value

    }));

  }


  // =====================================================
  // AVANÇAR ETAPA
  // =====================================================

  function proximaEtapa() {

    if (etapa < totalEtapas) {

      setEtapa((valor) => valor + 1);

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

    if (etapa > 1) {

      setEtapa((valor) => valor - 1);

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


    if (!formulario.aceitouTermos) {

      alert(
        "É necessário aceitar o termo de consentimento."
      );

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

      ...formulario

    };


    try {

      await salvarAnamnese(dadosAnamnese);


      alert(
        "Ficha enviada com sucesso 🌿"
      );


      setFormulario(formularioInicial);

      setEtapa(1);


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

          <option value="Diagnóstico confirmado">
            Diagnóstico confirmado
          </option>

          <option value="Suspeita ou investigação">
            Suspeita ou investigação
          </option>

          <option value="Histórico anterior">
            Histórico anterior
          </option>

          <option value="Não possui">
            Não possui
          </option>

          <option value="Prefiro não informar">
            Prefiro não informar
          </option>

        </select>

      </div>

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
            🌿 Dados pessoais
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
          />


          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={formulario.email}
            onChange={atualizarCampo}
            required
          />


          <input
            name="nascimento"
            type="date"
            value={formulario.nascimento}
            onChange={atualizarCampo}
          />


          <input
            name="telefone"
            placeholder="Telefone / WhatsApp"
            value={formulario.telefone}
            onChange={atualizarCampo}
          />


          <input
            name="cidade"
            placeholder="Cidade onde reside"
            value={formulario.cidade}
            onChange={atualizarCampo}
          />


          <input
            name="profissao"
            placeholder="Profissão"
            value={formulario.profissao}
            onChange={atualizarCampo}
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
            📞 Contato de emergência
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
            🤍 Saúde física
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


          <CampoSelecao
            label="Problemas no fígado"
            name="problemaHepatico"
          />


          <CampoSelecao
            label="Problemas nos rins"
            name="problemaRenal"
          />


          <textarea
            name="cirurgias"
            placeholder="Cirurgias ou internações importantes"
            value={formulario.cirurgias}
            onChange={atualizarCampo}
          />


          <textarea
            name="doencas"
            placeholder="Outras doenças ou condições de saúde importantes"
            value={formulario.doencas}
            onChange={atualizarCampo}
          />


          <textarea
            name="medicamentos"
            placeholder="Medicamentos utilizados atualmente"
            value={formulario.medicamentos}
            onChange={atualizarCampo}
          />


          <textarea
            name="alergias"
            placeholder="Alergias a medicamentos, alimentos ou outras substâncias"
            value={formulario.alergias}
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
            🧠 Neurodivergências
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


          <CampoSelecao
            label="Dislexia"
            name="dislexia"
          />


          <CampoSelecao
            label="Discalculia"
            name="discalculia"
          />


          <CampoSelecao
            label="Altas habilidades / superdotação"
            name="altasHabilidades"
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
            🧠 Saúde mental
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
            label="TEPT"
            name="tept"
          />


          <CampoSelecao
            label="Transtorno bipolar"
            name="transtornoBipolar"
          />


          <CampoSelecao
            label="Esquizofrenia ou outro transtorno psicótico"
            name="esquizofreniaPsicose"
          />


          <CampoSelecao
            label="Transtorno alimentar"
            name="transtornoAlimentar"
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
    // HISTÓRICO PSIQUIÁTRICO
    // ===================================================

    if (etapa === 6) {

      return (

        <section className="campo-grupo">

          <h2>
            🕊️ Histórico emocional e psiquiátrico
          </h2>

          <p className="descricao-etapa">
            Responda apenas o que se sentir confortável em compartilhar.
          </p>


          <CampoSelecao
            label="Já teve crises de pânico?"
            name="crisePanico"
          />


          <CampoSelecao
            label="Já teve episódios de mania ou hipomania?"
            name="maniaHipomania"
          />


          <CampoSelecao
            label="Já teve alucinações, delírios ou episódios de perda de contato com a realidade?"
            name="alucinacoes"
          />


          <CampoSelecao
            label="Já precisou de internação psiquiátrica ou atendimento de emergência?"
            name="internacaoPsiquiatrica"
          />


          <textarea
            name="acompanhamentoPsiquiatrico"
            placeholder="Faz ou já fez acompanhamento com psiquiatra? Se desejar, informe há quanto tempo."
            value={formulario.acompanhamentoPsiquiatrico}
            onChange={atualizarCampo}
          />


          <textarea
            name="acompanhamentoPsicologico"
            placeholder="Faz ou já fez acompanhamento psicológico? Se desejar, informe há quanto tempo."
            value={formulario.acompanhamentoPsicologico}
            onChange={atualizarCampo}
          />


          <textarea
            name="medicamentosPsiquiatricos"
            placeholder="Utiliza ou já utilizou medicamentos psiquiátricos? Quais?"
            value={formulario.medicamentosPsiquiatricos}
            onChange={atualizarCampo}
          />


          <textarea
            name="historicoFamiliarPsiquiatrico"
            placeholder="Existe histórico familiar relevante de condições psiquiátricas ou neurológicas?"
            value={formulario.historicoFamiliarPsiquiatrico}
            onChange={atualizarCampo}
          />


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
            🌿 Uso de substâncias
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


          <textarea
            name="ultimaUtilizacao"
            placeholder="Se considerar relevante, informe quando foi o último uso"
            value={formulario.ultimaUtilizacao}
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
            🌿 Medicinas já consagradas
          </h2>

          <p className="descricao-etapa">
            Selecione as medicinas com as quais você já teve contato.
          </p>


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
            🌙 Sua cerimônia e sua intenção
          </h2>


          <p className="descricao-etapa">
            Estas informações ajudam a compreender o momento
            que você está vivendo e sua intenção ao participar.
          </p>


          <input
            type="date"
            name="cerimoniaData"
            value={formulario.cerimoniaData}
            onChange={atualizarCampo}
          />


          <input
            name="tipoCerimonia"
            placeholder="Qual cerimônia deseja participar?"
            value={formulario.tipoCerimonia}
            onChange={atualizarCampo}
          />


          <CampoSelecao
            label="Será sua primeira experiência com essa cerimônia?"
            name="primeiraVez"
          />


          <textarea
            name="intencao"
            placeholder="Conte sua intenção ao participar desta cerimônia."
            value={formulario.intencao}
            onChange={atualizarCampo}
          />


          <textarea
            name="expectativas"
            placeholder="Quais são suas expectativas?"
            value={formulario.expectativas}
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
            🙏 Consentimento
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


          <label className="check-termo">

            <input
              type="checkbox"
              name="aceitouTermos"
              checked={formulario.aceitouTermos}
              onChange={atualizarCampo}
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

  return (

    <main className="anamnese">


      {/* =================================================
          CABEÇALHO
      ================================================= */}

      <section className="anamnese-header">


        {/* HOME */}

        <button
          type="button"
          className="btn-home"
          onClick={() => navigate("/")}
          aria-label="Voltar para Home"
        >

          <FaHome />

        </button>


        {/* USUÁRIO */}

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


        {/* LOGO */}

        <img
          src={logo}
          alt="Espaço Xamânico Pena Branca"
          className="logo-anamnese"
        />


        {/* TÍTULO */}

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

              Enviar minha ficha 🌿

            </button>

          )}

        </div>

      </form>

    </main>

  );

}


export default Anamnese;