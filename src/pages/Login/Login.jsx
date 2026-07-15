import "./Login.css";

import fundoLogin from "../../assets/imagens/login.png";
import googleLogo from "../../assets/imagens/google-logo.jpg";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config";

import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";


function Login() {


  const navigate = useNavigate();



  const loginGoogle = async () => {


    const provider = new GoogleAuthProvider();



    try {


      const resultado = await signInWithPopup(
        auth,
        provider
      );


      const usuario = resultado.user;



      console.log("Usuário logado:");
      console.log(usuario);



      alert(`Bem-vindo(a), ${usuario.displayName}`);



      navigate("/anamnese");



    } catch (error) {


      console.log("Erro no login:", error);


      alert("Não foi possível realizar o login.");


    }


  };




  return (


    <section
      className="login"
      style={{ backgroundImage: `url(${fundoLogin})` }}
    >



      <div className="overlay"></div>



      {/* BOTÃO HOME */}

      <button

        className="home-login"

        onClick={() => navigate("/")}

        aria-label="Voltar para início"

      >

        <FiHome />

      </button>





      <div className="login-card">



        <h2>

          Espaço Xamânico

        </h2>



        <h1>

          Pena Branca

        </h1>





        <span className="linha"></span>





        <h3>

          Ficha de Anamnese

        </h3>





        <p>

          Antes de participar de uma cerimônia,
          pedimos que realize seu login utilizando
          sua conta Google.

        </p>





        <p className="texto-secundario">


          Isso garante a segurança das suas informações
          e facilita seu atendimento.


        </p>







        <button

          className="google-btn"

          onClick={loginGoogle}

        >



          <img

            src={googleLogo}

            alt="Google"

          />



          Continuar com Google





        </button>









        <div className="seguranca">



          🔒 Seus dados são protegidos e utilizados
          apenas para organização das cerimônias.



        </div>









        <p className="frase">




          "Que este seja o início de uma jornada de
          autoconhecimento, respeito e conexão."




        </p>









        <span className="haux">



          Haux 🌿



        </span>







      </div>





    </section>


  );


}



export default Login;