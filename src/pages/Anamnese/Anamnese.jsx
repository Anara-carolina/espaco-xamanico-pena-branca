import "./Anamnese.css";

import logo from "../../assets/imagens/logonome.png";

import { useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";

import { salvarAnamnese } from "../../services/firebaseService";

import { useNavigate } from "react-router-dom";

import { FaHome } from "react-icons/fa";



function Anamnese() {


  const [usuario] = useAuthState(auth);


  const navigate = useNavigate();



  const [formulario, setFormulario] = useState({

    medicinasConsagradas: []

  });







  function atualizarCampo(e){



    const {

      name,

      value,

      type,

      checked


    } = e.target;





    // CHECKBOX DAS MEDICINAS

    if(type === "checkbox" && name === "medicinasConsagradas"){



      let lista = formulario.medicinasConsagradas || [];



      if(checked){


        lista = [

          ...lista,

          value

        ];


      } else {


        lista = lista.filter(

          (item) => item !== value

        );


      }





      setFormulario({


        ...formulario,


        medicinasConsagradas: lista


      });



      return;


    }








    setFormulario({


      ...formulario,


      [name]: type === "checkbox"

      ? checked

      : value


    });



  }









  async function enviarFormulario(e){



    e.preventDefault();





    if(!usuario){



      alert(

        "Você precisa estar logado para enviar a ficha."

      );



      return;


    }







    const dadosAnamnese = {



      usuarioId: usuario.uid,


      nomeUsuario: usuario.displayName,


      emailUsuario: usuario.email,


      dataEnvio: new Date(),



      ...formulario



    };









    try{



      await salvarAnamnese(dadosAnamnese);





      alert(

        "Ficha enviada com sucesso 🌿"

      );





      setFormulario({

        medicinasConsagradas: []

      });





    }catch(error){



      console.error(error);



      alert(

        "Erro ao salvar ficha."

      );



    }



  }










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









        {/* USUÁRIO LOGADO */}



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








        <h1>


          Ficha de Anamnese


        </h1>







        <p>


          Esta ficha tem como objetivo conhecer sua história,
          sua saúde e sua intenção antes da participação nas cerimônias.
          Todas as informações são tratadas com respeito e cuidado.


        </p>






      </section>









      <form


        className="form-anamnese"


        onSubmit={enviarFormulario}


      >







        <section className="campo-grupo">



          <h2>

            🌿 Dados pessoais

          </h2>







          <input


            name="nome"


            placeholder="Nome completo"


            onChange={atualizarCampo}


          />






          <input


            name="cpf"


            placeholder="CPF"


            onChange={atualizarCampo}


          />






          <input


            name="email"


            type="email"


            placeholder="E-mail"


            onChange={atualizarCampo}


          />






          <input


            name="nascimento"


            type="date"


            onChange={atualizarCampo}


          />






          <input


            name="telefone"


            placeholder="Telefone / WhatsApp"


            onChange={atualizarCampo}


          />






          <input


            name="cidade"


            placeholder="Cidade onde reside"


            onChange={atualizarCampo}


          />





        </section>







        <section className="campo-grupo">


          <h2>

            📞 Contato de emergência

          </h2>





          <input


            name="contatoEmergencia"


            placeholder="Nome do contato"


            onChange={atualizarCampo}


          />





          <input


            name="telefoneEmergencia"


            placeholder="Telefone do contato"


            onChange={atualizarCampo}


          />





          <input


            name="parentesco"


            placeholder="Grau de parentesco"


            onChange={atualizarCampo}


          />




        </section>

                <section className="campo-grupo">


          <h2>

            🤍 Saúde física

          </h2>





          <p>

            Possui pressão alta?

          </p>





          <label>


            <input


              type="radio"


              name="pressao"


              value="Sim"


              onChange={atualizarCampo}


            />


            Sim


          </label>






          <label>


            <input


              type="radio"


              name="pressao"


              value="Não"


              onChange={atualizarCampo}


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


              value="Sim"


              onChange={atualizarCampo}


            />


            Sim


          </label>






          <label>


            <input


              type="radio"


              name="diabetes"


              value="Não"


              onChange={atualizarCampo}


            />


            Não


          </label>









          <textarea


            name="doencas"


            placeholder="Possui alguma doença ou condição importante?"


            onChange={atualizarCampo}


          />








          <textarea


            name="medicamentos"


            placeholder="Utiliza medicamentos atualmente?"


            onChange={atualizarCampo}


          />








          <textarea


            name="alergias"


            placeholder="Possui alergias?"


            onChange={atualizarCampo}


          />




        </section>









        <section className="campo-grupo">


          <h2>

            🧠 Neurodivergência

          </h2>








          <label>


            <input


              type="checkbox"


              name="tdah"


              onChange={atualizarCampo}


            />


            TDAH


          </label>








          <label>


            <input


              type="checkbox"


              name="autismo"


              onChange={atualizarCampo}


            />


            Autismo (TEA)


          </label>








          <textarea


            name="outraNeurodivergencia"


            placeholder="Outra condição"


            onChange={atualizarCampo}


          />





        </section>









        <section className="campo-grupo">


          <h2>

            🌿 Uso de substâncias

          </h2>







          <p>

            Faz ou já fez uso de substâncias psicoativas?

          </p>








          <label>


            <input


              type="radio"


              name="substancias"


              value="Sim"


              onChange={atualizarCampo}


            />


            Sim


          </label>








          <label>


            <input


              type="radio"


              name="substancias"


              value="Não"


              onChange={atualizarCampo}


            />


            Não


          </label>








          <textarea


            name="substanciasQuais"


            placeholder="Se sim, qual substância utilizou?"


            onChange={atualizarCampo}


          />





        </section>









        <section className="campo-grupo">


          <h2>

            🌙 Sua intenção

          </h2>








          <textarea


            name="intencao"


            placeholder="Conte sua intenção ao participar desta cerimônia."


            onChange={atualizarCampo}


          />





        </section>









        <section className="campo-grupo">


          <h2>

            🌿 Medicinas já consagradas

          </h2>








          <p>

            Selecione quais medicinas você já teve contato:

          </p>








          <label>


            <input


              type="checkbox"


              name="medicinasConsagradas"


              value="Ayahuasca"


              onChange={atualizarCampo}


            />


            Ayahuasca


          </label>








          <label>


            <input


              type="checkbox"


              name="medicinasConsagradas"


              value="Rapé"


              onChange={atualizarCampo}


            />


            Medicina do Rapé


          </label>








          <label>


            <input


              type="checkbox"


              name="medicinasConsagradas"


              value="Sananga"


              onChange={atualizarCampo}


            />


            Sananga


          </label>








          <label>


            <input


              type="checkbox"


              name="medicinasConsagradas"


              value="Kambô"


              onChange={atualizarCampo}


            />


            Kambô


          </label>








          <input


            name="outrasMedicinas"


            placeholder="Outras medicinas que já consagrou"


            onChange={atualizarCampo}


          />








          <textarea


            name="experienciaMedicinas"


            placeholder="Conte como foi sua última experiência com as medicinas. Como você se sentiu durante e após a cerimônia?"


            onChange={atualizarCampo}


          />





        </section>

                <section className="campo-grupo">


          <h2>

            🌿 Próxima cerimônia

          </h2>





          <p>

            Informe a data da cerimônia que deseja participar:

          </p>





          <input


            type="date"


            name="cerimoniaData"


            onChange={atualizarCampo}


          />





        </section>









        <section className="campo-grupo">


          <h2>

            🙏 Consentimento

          </h2>







          <label className="check-termo">





            <input


              type="checkbox"


              name="aceitouTermos"


              onChange={atualizarCampo}


            />






            Declaro que as informações fornecidas são verdadeiras
            e estou ciente da importância de comunicar qualquer
            condição de saúde relevante.





          </label>





        </section>









        <button


          className="btn-enviar"


          type="submit"


        >



          Enviar minha ficha 🌿



        </button>









      </form>





    </main>


  );


}



export default Anamnese;