import "./Contato.css";

import { useState } from "react";
import { salvarContato } from "../../services/firebaseService";


function Contato() {


  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    motivo: ""
  });


  const [mensagem, setMensagem] = useState("");



  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  }



  async function handleSubmit(e) {

    e.preventDefault();


    try {

      await salvarContato(form);


      setMensagem("Mensagem enviada com sucesso! 🌿");


      setForm({
        nome: "",
        whatsapp: "",
        email: "",
        motivo: ""
      });


    } catch (error) {

      console.error(error);

      setMensagem(
        "Erro ao enviar mensagem."
      );

    }

  }



  return (

    <section className="contato">


      <div className="contato-container">


        <h1>
          Entre em contato conosco
        </h1>


        <p className="descricao">

          O Espaço Xamânico Pena Branca é um espaço de acolhimento,
          conexão e reconexão com o nosso coração.

        </p>


        <p className="descricao">

          Se você deseja participar de uma cerimônia, conhecer nossas
          medicinas sagradas ou tirar dúvidas, estamos aqui para receber você.

        </p>



        <form
          className="form-contato"
          onSubmit={handleSubmit}
        >


          <input
            type="text"
            name="nome"
            placeholder="Seu nome"
            value={form.nome}
            onChange={handleChange}
            required
          />


          <input
            type="tel"
            name="whatsapp"
            placeholder="Seu WhatsApp"
            value={form.whatsapp}
            onChange={handleChange}
            required
          />


          <input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            value={form.email}
            onChange={handleChange}
          />


          <select
            name="motivo"
            value={form.motivo}
            onChange={handleChange}
            required
          >

            <option value="">
              Motivo do contato
            </option>

            <option value="cerimonia">
              Quero participar de uma cerimônia
            </option>

            <option value="medicinas">
              Quero conhecer as medicinas
            </option>

            <option value="eventos">
              Quero saber sobre os eventos
            </option>

            <option value="duvidas">
              Tenho dúvidas
            </option>

            <option value="outros">
              Outros
            </option>

          </select>


          <button type="submit">
            Enviar mensagem 🌿
          </button>


        </form>



        {
          mensagem && (

            <p className="mensagem-envio">
              {mensagem}
            </p>

          )
        }




        <div className="localizacao">

          <h2>
            Onde estamos
          </h2>

          <p>
            📍 Uberaba - MG
          </p>

        </div>



        <p className="frase-final">

          "Que cada encontro seja uma oportunidade de cura,
          aprendizado e expansão da consciência."

          <br />

          <span>
            Haux 🌿
          </span>

        </p>


      </div>


    </section>

  );

}


export default Contato;