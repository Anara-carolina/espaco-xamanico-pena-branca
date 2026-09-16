import {
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  signOut
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { FiShield } from "react-icons/fi";

import { auth } from "../../firebase/config";

import { EMAILS_AUTORIZADOS } from "../../config/adminEmails";

import "./LoginAdmin.css";


/* =====================================================
   LOGIN ADMINISTRATIVO
   Os e-mails autorizados ficam em:
   src/config/adminEmails.js
===================================================== */

function LoginAdmin() {

  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();


  /* =====================================================
     LOGIN COM GOOGLE
  ===================================================== */

  async function entrarComGoogle() {

    try {

      /* -------------------------------------------------
         Mantém a sessão salva no navegador
      ------------------------------------------------- */

      await setPersistence(
        auth,
        browserLocalPersistence
      );


      /* -------------------------------------------------
         Abre o login do Google
      ------------------------------------------------- */

      const resultado = await signInWithPopup(
        auth,
        googleProvider
      );


      /* -------------------------------------------------
         Obtém o e-mail da conta Google
      ------------------------------------------------- */

      const emailGoogle = resultado.user.email;

      const email = emailGoogle
        ? emailGoogle.trim().toLowerCase()
        : "";


      /* =================================================
         DEBUG
         Vamos conferir exatamente o que o Firebase
         retornou e quais e-mails estão autorizados.
      ================================================= */

      console.log("================================");
      console.log("EMAIL GOOGLE:", email);
      console.log(
        "EMAILS AUTORIZADOS:",
        EMAILS_AUTORIZADOS
      );
      console.log(
        "AUTORIZADO:",
        EMAILS_AUTORIZADOS.includes(email)
      );
      console.log("================================");


      /* =================================================
         VERIFICAÇÃO DE AUTORIZAÇÃO
      ================================================= */

      if (!EMAILS_AUTORIZADOS.includes(email)) {

        console.log(
          "ACESSO NEGADO PARA:",
          email
        );


        /* -------------------------------------------------
           Desloga imediatamente o usuário não autorizado
        ------------------------------------------------- */

        await signOut(auth);


        alert(
          `O e-mail ${email} não está autorizado para acessar a área administrativa.`
        );


        /* -------------------------------------------------
           Impede qualquer navegação para o Dashboard
        ------------------------------------------------- */

        return;
      }


      /* =================================================
         E-MAIL AUTORIZADO
      ================================================= */

      console.log(
        "ACESSO AUTORIZADO PARA:",
        email
      );


      navigate("/admin/dashboard");


    } catch (error) {

      console.error(
        "ERRO NO LOGIN ADMINISTRATIVO:",
        error
      );


      switch (error.code) {

        case "auth/popup-closed-by-user":

          alert(
            "A janela do Google foi fechada."
          );

          break;


        case "auth/popup-blocked":

          alert(
            "O navegador bloqueou a janela do Google."
          );

          break;


        case "auth/cancelled-popup-request":

          alert(
            "O login com Google foi cancelado."
          );

          break;


        case "auth/unauthorized-domain":

          alert(
            "Este domínio ainda não está autorizado no Firebase."
          );

          break;


        case "auth/network-request-failed":

          alert(
            "Não foi possível conectar ao Firebase. Verifique sua conexão."
          );

          break;


        default:

          alert(
            "Erro ao entrar com Google."
          );

      }

    }

  }


  /* =====================================================
     INTERFACE
  ===================================================== */

  return (

    <main className="admin-login">

      <div className="admin-login-overlay" />


      <section className="admin-card">


        {/* =================================================
           ÍCONE
        ================================================= */}

        <div className="admin-login-icon">

          <FiShield />

        </div>


        {/* =================================================
           TEXTO SUPERIOR
        ================================================= */}

        <span className="admin-login-eyebrow">

          ACESSO RESTRITO

        </span>


        {/* =================================================
           TÍTULO
        ================================================= */}

        <h1>

          Área Administrativa

        </h1>


        {/* =================================================
           DESCRIÇÃO
        ================================================= */}

        <p className="admin-login-description">

          Gerencie seu espaço de forma simples,
          segura e organizada.

        </p>


        {/* =================================================
           DIVISOR
        ================================================= */}

        <div className="admin-login-line">

          <span />

          <small>

            ENTRAR

          </small>

          <span />

        </div>


        {/* =================================================
           LOGIN GOOGLE
        ================================================= */}

        <button
          type="button"
          className="google-login-button"
          onClick={entrarComGoogle}
        >

          <span className="google-icon">

            <FcGoogle />

          </span>


          <span>

            Entrar com Google

          </span>

        </button>


        {/* =================================================
           SEGURANÇA
        ================================================= */}

        <p className="admin-login-security">

          <FiShield />

          Login protegido pelo Google

        </p>


        {/* =================================================
           RODAPÉ
        ================================================= */}

        <div className="admin-login-footer">

          <span>

            Área exclusiva para administração

          </span>

        </div>


      </section>

    </main>

  );

}


export default LoginAdmin;