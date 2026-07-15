import "./Anamnese.css";

import logo from "../../assets/imagens/logonome.png";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";

import { useNavigate } from "react-router-dom";

import { FaHome } from "react-icons/fa";


function Anamnese() {


  const [usuario] = useAuthState(auth);

  const navigate = useNavigate();



  return (

    <main className="anamnese">


      <section className="anamnese-header">



        {/* BOTÃO HOME */}

        <button

          className="btn-home"

          onClick={() => navigate("/")}

          aria-label="Voltar para Home"

        >

          <FaHome />

        </button>





        {/* LINHA DOURADA */}

        <div className="linha-separadora"></div>







        {/* USUÁRIO LOGADO */}

        {usuario && (

          <div className="usuario-logado">


            {usuario.photoURL && (

              <img

                src={usuario.photoURL}

                alt="Foto do usuário"

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

        )}







        {/* LOGO */}

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









      <form className="form-anamnese">







        <section className="campo-grupo">


          <h2>🌿 Dados pessoais</h2>


          <input
            type="text"
            placeholder="Nome completo"
          />


          <input
            type="text"
            placeholder="CPF"
          />


          <input
            type="email"
            placeholder="E-mail"
          />


          <input
            type="date"
          />


          <input
            type="tel"
            placeholder="Telefone / WhatsApp"
          />


          <input
            type="text"
            placeholder="Cidade onde reside"
          />


        </section>








        <section className="campo-grupo">


          <h2>📞 Contato de emergência</h2>


          <input
            type="text"
            placeholder="Nome do contato"
          />


          <input
            type="tel"
            placeholder="Telefone do contato"
          />


          <input
            type="text"
            placeholder="Grau de parentesco"
          />


        </section>








        <section className="campo-grupo">


          <h2>🤍 Saúde física</h2>



          <p>
            Possui pressão alta?
          </p>



          <label>

            <input 
              type="radio" 
              name="pressao"
            />

            Sim

          </label>



          <label>

            <input 
              type="radio" 
              name="pressao"
            />

            Não

          </label>






          <p>
            Possui diabetes?
          </p>



          <label>

            <input 
              type="radio" 
              name="diabetes"
            />

            Sim

          </label>




          <label>

            <input 
              type="radio" 
              name="diabetes"
            />

            Não

          </label>





          <textarea
            placeholder="Possui alguma doença crônica ou condição de saúde importante?"
          />



          <textarea
            placeholder="Utiliza medicamentos atualmente? Informe quais."
          />



          <textarea
            placeholder="Possui alergias?"
          />



        </section>









        <section className="campo-grupo">


          <h2>🧠 Neurodivergência e saúde emocional</h2>


          <p>
            Possui alguma neurodivergência?
          </p>



          <label>

            <input type="checkbox"/>

            TDAH

          </label>



          <label>

            <input type="checkbox"/>

            Autismo (TEA)

          </label>



          <label>

            <input type="checkbox"/>

            Outra

          </label>



          <textarea

            placeholder="Caso tenha alguma outra condição, informe aqui."

          />


        </section>









        <section className="campo-grupo">


          <h2>🌿 Uso de substâncias</h2>



          <p>

            Faz ou já fez uso de substâncias psicoativas?

          </p>



          <label>

            <input 
              type="radio" 
              name="substancias"
            />

            Sim

          </label>




          <label>

            <input 
              type="radio" 
              name="substancias"
            />

            Não

          </label>





          <textarea

            placeholder="Se sim, qual substância utilizou?"

          />




          <textarea

            placeholder="Por quanto tempo utilizou? Quando foi o último uso?"

          />



        </section>









        <section className="campo-grupo">


          <h2>🌙 Sua intenção</h2>



          <textarea

            placeholder="Conte qual sua intenção ao participar desta cerimônia."

          />



        </section>









        <section className="campo-grupo">


          <h2>🌱 Experiência com medicinas</h2>



          <label>

            <input type="checkbox"/>

            Ayahuasca

          </label>



          <label>

            <input type="checkbox"/>

            Rapé

          </label>



          <label>

            <input type="checkbox"/>

            Sananga

          </label>



          <label>

            <input type="checkbox"/>

            Kambô

          </label>





          <textarea

            placeholder="Conte como foi sua última experiência com a medicina. Como você se sentiu durante e após a cerimônia?"

          />



        </section>









        <section className="campo-grupo">


          <h2>🌿 Próxima cerimônia</h2>



          <label>

            Informe a data da cerimônia que deseja participar:

          </label>




          <input

            type="date"

          />



        </section>









        <section className="campo-grupo">


          <h2>🙏 Consentimento</h2>




          <label className="check-termo">


            <input type="checkbox"/>


            Declaro que as informações fornecidas são verdadeiras
            e estou ciente da importância de comunicar qualquer
            condição de saúde relevante.


          </label>



        </section>








        <button className="btn-enviar">

          Enviar minha ficha 🌿

        </button>





      </form>




    </main>

  );

}



export default Anamnese;