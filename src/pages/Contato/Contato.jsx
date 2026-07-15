import "./Contato.css";

function Contato() {
  return (
    <section className="contato">

      <div className="contato-container">

        <h1>Entre em contato conosco</h1>

        <p className="descricao">
          O Espaço Xamânico Pena Branca é um espaço de acolhimento,
          conexão e reconexão com o nosso coração.
        </p>

        <p className="descricao">
          Se você deseja participar de uma cerimônia, conhecer nossas
          medicinas sagradas ou tirar dúvidas, estamos aqui para receber você.
        </p>


        <form className="form-contato">

          <input 
            type="text" 
            placeholder="Seu nome"
          />

          <input 
            type="tel" 
            placeholder="Seu WhatsApp"
          />

          <input 
            type="email" 
            placeholder="Seu e-mail"
          />


          <select>
            <option>Motivo do contato</option>
            <option>
              Quero participar de uma cerimônia
            </option>

            <option>
              Quero conhecer as medicinas
            </option>

            <option>
              Quero saber sobre os eventos
            </option>

            <option>
              Tenho dúvidas
            </option>

            <option>
              Outros
            </option>

          </select>


          <button type="submit">
            Enviar mensagem 🌿
          </button>

        </form>


        <div className="localizacao">

          <h2>Onde estamos</h2>

          <p>
            📍 Uberaba - MG
          </p>

        </div>


        <p className="frase-final">
          "Que cada encontro seja uma oportunidade de cura,
          aprendizado e expansão da consciência."
          <br />
          <span>Haux 🌿</span>
        </p>


      </div>

    </section>
  );
}

export default Contato;