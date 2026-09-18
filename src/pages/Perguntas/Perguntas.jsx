
import { useState } from "react";

import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../../firebase/config";

import "./Perguntas.css";


function Perguntas() {

  const [aberta, setAberta] = useState(null);

  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    pergunta: ""
  });

  const [enviando, setEnviando] = useState(false);

  const [erro, setErro] = useState("");

  const [modalSucesso, setModalSucesso] = useState(false);


  const perguntas = [

    {
      pergunta: "O que são as medicinas da floresta?",
      resposta:
        "As medicinas da floresta são conhecimentos ancestrais relacionados às plantas, aos animais, aos elementos da natureza e às formas de cuidado desenvolvidas por diferentes povos indígenas e comunidades tradicionais. Elas não podem ser separadas da floresta, dos cantos, das rezas, dos rituais e da relação espiritual com a natureza. Em muitas tradições, a medicina é compreendida como uma forma de aprendizado e conexão: um caminho de presença, autoconhecimento, transformação interior e aproximação com a ancestralidade. Cada povo possui seus próprios conhecimentos, nomes, formas de preparo e maneiras de se relacionar com essas medicinas, por isso é importante respeitar a origem e a tradição de cada uma."
    },

    {
      pergunta: "O que é a Ayahuasca e como ela atua?",
      resposta:
        "A Ayahuasca é um chá sagrado de origem amazônica, utilizado há muitas gerações por diferentes povos indígenas e posteriormente incorporado por diversas tradições espirituais. Em muitas preparações tradicionais, estão presentes o Jagube, o cipó Banisteriopsis caapi, e a Chacrona, a folha de Psychotria viridis. Existe também uma explicação química muito interessante por trás dessa combinação. A Chacrona é uma das plantas tradicionalmente utilizadas como fonte de DMT, uma molécula psicodélica que atua principalmente sobre receptores de serotonina no cérebro. Quando ingerido sozinho por via oral, o DMT é rapidamente degradado pela enzima monoamina oxidase, principalmente a MAO-A, presente no organismo. O Jagube contém alcaloides chamados beta-carbolinas, entre eles harmina, harmalina e tetrahidro-harmina, que inibem reversivelmente a MAO-A. Dessa forma, essas substâncias diminuem a degradação do DMT e permitem que ele permaneça disponível no organismo. Essa interação entre as plantas ajuda a explicar, pela ciência, um dos mecanismos que tornam possível a experiência da Ayahuasca por via oral. Mas a Ayahuasca não se resume à sua química. Dentro das tradições, ela é um chá sagrado e uma medicina espiritual, recebida em cerimônias com cantos, rezas, silêncio e intenção. Para muitas pessoas, sua vivência representa um encontro profundo consigo mesmas, com a natureza e com a ancestralidade, podendo trazer processos de reflexão, autoconhecimento e transformação espiritual."
    },

    {
      pergunta: "O que é o Rapé?",
      resposta:
        "O Rapé é uma medicina tradicional utilizada por diferentes povos indígenas da Amazônia e possui formas de preparo e significados que variam de acordo com cada tradição. Tradicionalmente, seu preparo pode envolver tabaco e cinzas produzidas a partir de diferentes plantas, ervas ou árvores, que são cuidadosamente preparadas e transformadas em um pó muito fino. Mais do que simplesmente um pó utilizado pelas vias nasais, o Rapé está inserido em contextos de oração, canto, concentração e conexão espiritual. Em muitas tradições, ele é recebido como uma medicina de força, presença e aterramento, ajudando a pessoa a silenciar o excesso de pensamentos e voltar sua atenção para o momento presente. Seu uso também está ligado aos conhecimentos ancestrais sobre as plantas e à relação espiritual dos povos indígenas com a floresta."
    },

    {
      pergunta: "O que é a Sananga?",
      resposta:
        "A Sananga é uma medicina tradicional amazônica preparada a partir de plantas utilizadas por diferentes povos indígenas. Seu uso está relacionado principalmente aos olhos e pode provocar uma sensação inicialmente muito intensa, seguida por um período de silêncio, presença e introspecção. Entre os conhecimentos tradicionais Huni Kuin, a Sananga também possui uma relação importante com a caça. Existem relatos dentro da própria tradição de que os caçadores utilizavam a Sananga antes de entrar na mata e que, quando não a utilizavam, poderiam retornar sem encontrar caça. A tradição também relaciona a Sananga à percepção e à capacidade de encontrar aquilo que se procura na floresta. A Sananga também aparece relacionada às mulheres artesãs e ao trabalho com os grafismos e artes tradicionais. Dentro desse universo simbólico, a medicina está ligada à percepção, à concentração e à capacidade de enxergar e criar com mais presença. Para muitas pessoas, sua vivência hoje representa um momento de limpeza, foco, presença e conexão com a floresta e com os ensinamentos ancestrais."
    },

    {
      pergunta: "O que é o Kambô?",
      resposta:
        "O Kambô é uma prática tradicional de alguns povos indígenas da Amazônia que utiliza a secreção da rã Phyllomedusa bicolor. Seu conhecimento está relacionado às tradições da floresta e às formas ancestrais de cuidado, força e preparação para determinados momentos da vida. A vivência pode provocar respostas físicas bastante intensas e, dentro de diferentes contextos tradicionais e espirituais, é compreendida como um processo de purificação, renovação e fortalecimento. Para quem percorre esse caminho espiritual, o Kambô pode ser vivido como um momento de entrega, presença e transformação, sempre respeitando a tradição, os cuidados necessários e a condução de um facilitador preparado."
    },

    {
      pergunta: "Preciso ter experiência para participar de uma cerimônia?",
      resposta:
        "Não. Uma pessoa pode participar de uma cerimônia pela primeira vez sem ter qualquer experiência anterior com as medicinas da floresta. O mais importante é chegar com respeito, consciência e disposição para conhecer a tradição. Antes da cerimônia, é importante conversar com o facilitador, esclarecer suas dúvidas e receber todas as orientações necessárias. Cada pessoa possui sua própria caminhada e sua própria relação com a espiritualidade. Não existe uma experiência que precise ser alcançada ou comparada com a de outra pessoa. A cerimônia é um espaço de presença, escuta e respeito pelo próprio processo."
    },

    {
      pergunta: "Posso participar de uma cerimônia se estiver tomando medicamentos?",
      resposta:
        "Essa é uma questão que deve ser tratada com muita responsabilidade. Algumas medicinas da floresta podem apresentar interações importantes com determinados medicamentos e substâncias, especialmente a Ayahuasca devido à presença de compostos que atuam sobre a enzima MAO-A. Por isso, é fundamental informar previamente ao facilitador todos os medicamentos e substâncias que utiliza e buscar orientação de um profissional de saúde quando houver qualquer dúvida. A espiritualidade também envolve responsabilidade e cuidado com o corpo. Nenhuma vivência deve acontecer sem que a segurança da pessoa seja considerada."
    },

    {
      pergunta: "Como devo me preparar para uma cerimônia?",
      resposta:
        "A preparação depende da tradição e da medicina que será utilizada, por isso as orientações do facilitador devem ser sempre respeitadas. De maneira geral, é importante descansar, cuidar da alimentação conforme as orientações recebidas e evitar chegar à cerimônia com pressa ou excesso de estímulos. Também pode ser um momento de olhar para dentro e perceber qual é a sua intenção. Em muitas tradições, a intenção é parte importante da caminhada: o que você deseja compreender, transformar, entregar ou simplesmente vivenciar? Mais do que buscar uma experiência específica, a proposta é chegar com presença, respeito e abertura para escutar o que o momento pode ensinar."
    },

    {
      pergunta: "As medicinas da floresta são indicadas para tratar doenças?",
      resposta:
        "As tradições indígenas possuem formas próprias de compreender a cura, o equilíbrio e o cuidado com o ser humano, muitas vezes envolvendo dimensões físicas, espirituais, emocionais e comunitárias. Para muitas pessoas, as medicinas da floresta podem acompanhar processos profundos de autoconhecimento, reflexão e transformação interior. Entretanto, isso não significa que substituam tratamentos médicos ou psicológicos. O conhecimento tradicional e a espiritualidade possuem seu próprio lugar, enquanto questões de saúde devem continuar sendo acompanhadas por profissionais qualificados. Caminhar com as medicinas também significa respeitar os limites do corpo e buscar conhecimento."
    },

    {
      pergunta: "Posso tirar uma dúvida antes de participar?",
      resposta:
        "Sim. Perguntar faz parte do processo de preparação. Antes de uma cerimônia, é importante compreender qual medicina será utilizada, conhecer a proposta da vivência, saber como será conduzida e esclarecer qualquer dúvida que possa existir. Você pode enviar sua pergunta pelo formulário abaixo. O facilitador poderá analisar a questão e, quando fizer sentido, compartilhar a resposta para que outras pessoas também possam encontrar orientação. Conhecimento, respeito e consciência são partes importantes de qualquer caminho espiritual."
    }

  ];


  const alternarPergunta = (index) => {

    setAberta(
      aberta === index
        ? null
        : index
    );

  };


  function alterarCampo(event) {

    const { name, value } = event.target;

    setFormulario((estadoAtual) => ({
      ...estadoAtual,
      [name]: value
    }));

    setErro("");

  }


  async function enviarPergunta(event) {

    event.preventDefault();

    setErro("");


    if (
      !formulario.nome.trim() ||
      !formulario.email.trim() ||
      !formulario.whatsapp.trim() ||
      !formulario.pergunta.trim()
    ) {

      setErro(
        "Preencha todos os campos antes de enviar sua pergunta."
      );

      return;

    }


    try {

      setEnviando(true);


      await addDoc(
        collection(db, "perguntas"),
        {
          nome: formulario.nome.trim(),
          email: formulario.email.trim(),
          whatsapp: formulario.whatsapp.trim(),
          pergunta: formulario.pergunta.trim(),
          status: "pendente",
          criadoEm: serverTimestamp()
        }
      );


      setFormulario({
        nome: "",
        email: "",
        whatsapp: "",
        pergunta: ""
      });


      setModalSucesso(true);


    } catch (error) {

      console.error(
        "Erro ao enviar pergunta:",
        error
      );

      setErro(
        "Não foi possível enviar sua pergunta. Tente novamente."
      );


    } finally {

      setEnviando(false);

    }

  }


  return (

    <main className="perguntas-page">


      <section className="perguntas-hero">

        <div className="perguntas-hero-conteudo">

          <h1>
            Perguntas Frequentes
          </h1>

          <p>
            Tire suas dúvidas e conheça um pouco mais sobre as medicinas
            da floresta, suas tradições e os caminhos de conexão com a
            espiritualidade e a ancestralidade.
          </p>

        </div>

      </section>


      <section className="perguntas-conteudo">


        <div className="perguntas-introducao">

          <h2>
            Tem alguma dúvida?
          </h2>

          <p>
            Reunimos algumas perguntas para quem deseja conhecer mais
            profundamente as medicinas da floresta e compreender melhor
            a história, a tradição e o significado de cada vivência.
          </p>

        </div>


        <div className="perguntas-lista">

          {perguntas.map((item, index) => (

            <div
              className={`pergunta-item ${
                aberta === index
                  ? "aberta"
                  : ""
              }`}
              key={index}
            >

              <button
                type="button"
                className="pergunta-botao"
                onClick={() =>
                  alternarPergunta(index)
                }
              >

                <span>
                  {item.pergunta}
                </span>

                <span className="pergunta-simbolo">
                  {aberta === index
                    ? "−"
                    : "+"}
                </span>

              </button>


              {aberta === index && (

                <div className="pergunta-resposta">

                  <p>
                    {item.resposta}
                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      </section>


      <section className="faca-sua-pergunta">


        <div className="faca-sua-pergunta-conteudo">


          <h2>
            Faça você a sua pergunta
          </h2>


          <p>
            Não encontrou a resposta que procurava?
            Envie sua dúvida para nossa equipe.
          </p>


          <form onSubmit={enviarPergunta}>


            <div className="campo-pergunta">

              <label htmlFor="nome">
                Seu nome
              </label>

              <input
                id="nome"
                name="nome"
                type="text"
                value={formulario.nome}
                onChange={alterarCampo}
                placeholder="Digite seu nome"
                autoComplete="name"
                required
              />

            </div>


            <div className="campo-pergunta">

              <label htmlFor="email">
                Seu e-mail
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formulario.email}
                onChange={alterarCampo}
                placeholder="Digite seu e-mail"
                autoComplete="email"
                required
              />

            </div>


            <div className="campo-pergunta">

              <label htmlFor="whatsapp">
                Seu WhatsApp
              </label>

              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                value={formulario.whatsapp}
                onChange={alterarCampo}
                placeholder="Digite seu WhatsApp"
                autoComplete="tel"
                required
              />

            </div>


            <div className="campo-pergunta">

              <label htmlFor="pergunta">
                Sua pergunta
              </label>

              <textarea
                id="pergunta"
                name="pergunta"
                rows="6"
                value={formulario.pergunta}
                onChange={alterarCampo}
                placeholder="Escreva sua dúvida..."
                required
              />

            </div>


            {erro && (

              <p
                className="mensagem-pergunta erro"
                role="alert"
              >
                {erro}
              </p>

            )}


            <button
              type="submit"
              className="botao-enviar-pergunta"
              disabled={enviando}
            >

              {enviando
                ? "Enviando..."
                : "Enviar pergunta"}

            </button>


          </form>


        </div>

      </section>


      {modalSucesso && (

        <div
          className="modal-sucesso-overlay"
          onClick={() => setModalSucesso(false)}
        >

          <div
            className="modal-sucesso"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-sucesso-linha"></div>

            <h2>
              Mensagem enviada com sucesso
            </h2>

            <p>
              Sua pergunta foi recebida.
              Em breve entraremos em contato.
            </p>

            <button
              type="button"
              onClick={() => setModalSucesso(false)}
            >
              Fechar
            </button>

          </div>

        </div>

      )}


    </main>

  );

}


export default Perguntas;
