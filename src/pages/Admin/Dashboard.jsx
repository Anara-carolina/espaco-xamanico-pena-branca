import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../../firebase/config";

import {
  FaCalendarAlt,
  FaClipboardList,
  FaEnvelope,
  FaSignOutAlt
} from "react-icons/fa";

import "./Dashboard.css";


function Dashboard() {


  const navigate = useNavigate();



  async function sair() {


    await signOut(auth);

    navigate("/admin");


  }




  const opcoes = [


    {
      titulo: "Gerenciar Cerimônias",
      descricao: "Alterar informações das cerimônias",
      icone: <FaCalendarAlt />,
      rota: "/admin/cerimonias"
    },


    {
      titulo: "Visualizar Anamneses",
      descricao: "Consultar fichas preenchidas",
      icone: <FaClipboardList />,
      rota: "/admin/anamneses"
    },


    {
      titulo: "Mensagens de Contato",
      descricao: "Ver mensagens recebidas",
      icone: <FaEnvelope />,
      rota: "/admin/mensagens"
    }


  ];





  return (


    <div className="dashboard">



      <header className="dashboard-header">


        <h1>

          🌿 Painel Administrativo

        </h1>


        <p>

          Espaço Xamânico Pena Branca

        </p>


      </header>






      <section className="dashboard-grid">



        {opcoes.map((item) => (


          <div

            className="dashboard-card"

            key={item.titulo}

            onClick={() => navigate(item.rota)}

          >



            <div className="dashboard-icon">

              {item.icone}

            </div>



            <h2>

              {item.titulo}

            </h2>



            <p>

              {item.descricao}

            </p>



          </div>


        ))}







        <div

          className="dashboard-card sair"

          onClick={sair}

        >


          <div className="dashboard-icon">

            <FaSignOutAlt />

          </div>



          <h2>

            Sair

          </h2>



          <p>

            Encerrar sessão

          </p>


        </div>




      </section>




    </div>


  );


}


export default Dashboard;