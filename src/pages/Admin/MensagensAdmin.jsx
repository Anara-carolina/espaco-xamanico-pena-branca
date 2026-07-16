import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaTrash
} from "react-icons/fa";

import {
  buscarContatos,
  removerContato
} from "../../services/firebaseService";

import "./MensagensAdmin.css";

function MensagensAdmin() {

  const navigate = useNavigate();

  const [mensagens, setMensagens] = useState([]);

  async function carregarMensagens() {

    try {

      const dados = await buscarContatos();

      setMensagens(dados);

    } catch (error) {

      console.error(
        "Erro ao buscar mensagens:",
        error
      );

    }

  }

  useEffect(() => {

    carregarMensagens();

  }, []);

  function formatarData(timestamp) {

    if (!timestamp) return "Sem data";

    if (timestamp.toDate) {

      return timestamp
        .toDate()
        .toLocaleDateString("pt-BR");

    }

    return "Sem data";

  }

  async function excluirMensagem(id) {

    const confirmar = window.confirm(
      "Deseja realmente excluir esta mensagem?"
    );

    if (!confirmar) return;

    try {

      await removerContato(id);

      carregarMensagens();

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <main className="mensagens-admin">

      <header className="admin-topo">

        <button
          className="btn-voltar-admin"
          onClick={() => navigate("/admin/dashboard")}
        >

          <FaArrowLeft />

          Voltar

        </button>

        <h1>

          Mensagens de Contato

        </h1>

      </header>

      <section className="lista-mensagens">

        {mensagens.length === 0 && (

          <p>

            Nenhuma mensagem encontrada.

          </p>

        )}

        {mensagens.map((item) => (

          <article
            className="card-mensagem"
            key={item.id}
          >

            <h2>

              {item.nome}

            </h2>

            <p>

              <strong>E-mail:</strong> {item.email || "-"}

            </p>

            <p>

              <strong>WhatsApp:</strong> {item.whatsapp || "-"}

            </p>

            <p>

              <strong>Motivo:</strong> {item.motivo || "-"}

            </p>

            <p>

              <strong>Enviado em:</strong> {formatarData(item.criadoEm)}

            </p>

            <button
              className="btn-excluir"
              onClick={() => excluirMensagem(item.id)}
            >

              <FaTrash />

              Excluir

            </button>

          </article>

        ))}

      </section>

    </main>

  );

}

export default MensagensAdmin;