
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query
} from "firebase/firestore";

import { db } from "../../firebase/config";

import {
  FaEnvelope,
  FaTrash,
  FaQuestionCircle,
  FaUser,
  FaCalendarAlt
} from "react-icons/fa";

import "./PerguntasAdmin.css";


function PerguntasAdmin() {

  const [perguntas, setPerguntas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [perguntaAberta, setPerguntaAberta] = useState(null);


  async function carregarPerguntas() {

    try {

      setCarregando(true);
      setErro("");

      const referencia = collection(db, "perguntas");

      const consulta = query(
        referencia,
        orderBy("criadoEm", "desc")
      );

      const resultado = await getDocs(consulta);

      const lista = resultado.docs.map((item) => ({
        id: item.id,
        ...item.data()
      }));

      setPerguntas(lista);

    } catch (error) {

      console.error("Erro ao carregar perguntas:", error);

      setErro(
        "Não foi possível carregar as perguntas recebidas."
      );

    } finally {

      setCarregando(false);

    }

  }


  useEffect(() => {

    carregarPerguntas();

  }, []);


  function formatarData(data) {

    if (!data) {
      return "Data não informada";
    }

    try {

      const dataFormatada = data.toDate
        ? data.toDate()
        : new Date(data);

      return dataFormatada.toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        }
      );

    } catch {

      return "Data não informada";

    }

  }


  async function excluirPergunta(id) {

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta pergunta?"
    );

    if (!confirmar) {
      return;
    }

    try {

      await deleteDoc(
        doc(db, "perguntas", id)
      );

      setPerguntas((listaAtual) =>
        listaAtual.filter((item) => item.id !== id)
      );

      if (perguntaAberta === id) {
        setPerguntaAberta(null);
      }

    } catch (error) {

      console.error("Erro ao excluir pergunta:", error);

      alert(
        "Não foi possível excluir a pergunta."
      );

    }

  }


  function alternarPergunta(id) {

    setPerguntaAberta(
      perguntaAberta === id ? null : id
    );

  }


  return (

    <main className="perguntas-admin">


      <header className="perguntas-admin-header">

        <div className="perguntas-admin-titulo">

          <div className="perguntas-admin-icone">
            <FaQuestionCircle />
          </div>

          <div>

            <h1>
              Perguntas Recebidas
            </h1>

            <p>
              Dúvidas enviadas através do site
            </p>

          </div>

        </div>


        <div className="perguntas-admin-total">

          <span>
            {perguntas.length}
          </span>

          <small>
            {perguntas.length === 1
              ? "pergunta"
              : "perguntas"}
          </small>

        </div>

      </header>


      {carregando && (

        <div className="perguntas-admin-mensagem">

          <FaQuestionCircle />

          <p>
            Carregando perguntas...
          </p>

        </div>

      )}


      {!carregando && erro && (

        <div className="perguntas-admin-mensagem erro">

          <p>
            {erro}
          </p>

          <button
            type="button"
            onClick={carregarPerguntas}
          >
            Tentar novamente
          </button>

        </div>

      )}


      {!carregando &&
        !erro &&
        perguntas.length === 0 && (

          <div className="perguntas-admin-vazio">

            <FaQuestionCircle />

            <h2>
              Nenhuma pergunta recebida
            </h2>

            <p>
              Quando alguém enviar uma dúvida
              pelo site, ela aparecerá aqui.
            </p>

          </div>

        )}


      {!carregando &&
        !erro &&
        perguntas.length > 0 && (

          <section className="perguntas-admin-lista">


            {perguntas.map((item) => (

              <article
                className={`pergunta-admin-card ${
                  perguntaAberta === item.id
                    ? "aberta"
                    : ""
                }`}
                key={item.id}
              >


                <button
                  type="button"
                  className="pergunta-admin-cabecalho"
                  onClick={() =>
                    alternarPergunta(item.id)
                  }
                >

                  <div className="pergunta-admin-principal">

                    <div className="pergunta-admin-avatar">
                      <FaUser />
                    </div>

                    <div>

                      <h2>
                        {item.nome || "Nome não informado"}
                      </h2>

                      <span>
                        {item.email || "E-mail não informado"}
                      </span>

                    </div>

                  </div>


                  <div className="pergunta-admin-data">

                    <FaCalendarAlt />

                    <span>
                      {formatarData(item.criadoEm)}
                    </span>

                  </div>


                </button>


                <div className="pergunta-admin-resumo">

                  <span className="pergunta-admin-label">
                    Pergunta
                  </span>

                  <p>
                    {item.pergunta}
                  </p>

                </div>


                {perguntaAberta === item.id && (

                  <div className="pergunta-admin-detalhes">


                    <div className="pergunta-admin-info">

                      <div>

                        <span className="pergunta-admin-label">
                          Nome
                        </span>

                        <p>
                          {item.nome || "Não informado"}
                        </p>

                      </div>


                      <div>

                        <span className="pergunta-admin-label">
                          E-mail
                        </span>

                        <p>
                          {item.email || "Não informado"}
                        </p>

                      </div>

                    </div>


                    <div className="pergunta-admin-texto">

                      <span className="pergunta-admin-label">
                        Pergunta completa
                      </span>

                      <p>
                        {item.pergunta}
                      </p>

                    </div>


                    <div className="pergunta-admin-acoes">

                      {item.email && (

                        <a
                          href={`mailto:${item.email}`}
                          className="botao-responder-email"
                        >
                          <FaEnvelope />
                          Responder por e-mail
                        </a>

                      )}


                      <button
                        type="button"
                        className="botao-excluir-pergunta"
                        onClick={() =>
                          excluirPergunta(item.id)
                        }
                      >
                        <FaTrash />
                        Excluir
                      </button>

                    </div>


                  </div>

                )}


              </article>

            ))}


          </section>

        )}


    </main>

  );

}


export default PerguntasAdmin;
