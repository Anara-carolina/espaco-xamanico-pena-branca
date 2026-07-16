import { useState } from "react";

import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase/config";

import "./LoginAdmin.css";



function LoginAdmin() {


  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");



  const navigate = useNavigate();





  async function entrar(e) {


    e.preventDefault();




    try {


      // mantém o login salvo no navegador

      await setPersistence(

        auth,

        browserLocalPersistence

      );






      await signInWithEmailAndPassword(

        auth,

        email,

        senha

      );






      // Dashboard administrativo

      navigate("/admin/dashboard");






    } catch (error) {


      console.error(error);




      switch (error.code) {


        case "auth/invalid-credential":

          alert(
            "E-mail ou senha inválidos."
          );

          break;



        case "auth/user-not-found":

          alert(
            "Usuário não encontrado."
          );

          break;



        case "auth/wrong-password":

          alert(
            "Senha incorreta."
          );

          break;



        case "auth/invalid-email":

          alert(
            "E-mail inválido."
          );

          break;



        default:

          alert(
            "Erro ao fazer login."
          );


      }


    }


  }







  return (



    <div className="admin-login">





      <div className="admin-card">





        <h1>

          🌿 Área Administrativa

        </h1>







        <form onSubmit={entrar}>






          <input


            type="email"


            placeholder="Digite seu e-mail"


            value={email}


            onChange={(e)=>setEmail(e.target.value)}


            required


          />








          <input


            type="password"


            placeholder="Digite sua senha"


            value={senha}


            onChange={(e)=>setSenha(e.target.value)}


            required


          />









          <button type="submit">


            Entrar


          </button>








        </form>







      </div>







    </div>



  );


}



export default LoginAdmin;