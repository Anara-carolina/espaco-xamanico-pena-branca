import logo from "../../assets/imagens/logonome.png";
import instagram from "../../assets/imagens/instagram.png";
import whats from "../../assets/imagens/whats.png";

import { Link } from "react-router-dom";

import "./MenuMobile.css";


function MenuMobile({ aberto, fecharMenu }) {


  return (

    <>


      {aberto && (

        <div 
          className="menu-overlay"
          onClick={fecharMenu}
        >

        </div>

      )}



      <nav className={`menu-mobile ${aberto ? "ativo" : ""}`}>



        <button 
          className="fechar-menu"
          onClick={fecharMenu}
        >
          ×
        </button>




        <img 
          className="logo-menu"
          src={logo}
          alt="Espaço Xamânico Pena Branca"
        />



        <p className="frase-menu">

          Cultura • Natureza • Espiritualidade

        </p>





        <Link to="/" onClick={fecharMenu}>
  Início
</Link>


<Link to="/sobre" onClick={fecharMenu}>
  Sobre Nós
</Link>


<Link to="/cerimonias" onClick={fecharMenu}>
  Cerimônias
</Link>


<Link to="/agenda" onClick={fecharMenu}>
  Agenda
</Link>


<Link to="/medicinas/ayahuasca" onClick={fecharMenu}>
  Medicinas
</Link>


<Link to="/galeria" onClick={fecharMenu}>
  Galeria
</Link>


<Link to="/anamnese" onClick={fecharMenu}>
  Anamnese
</Link>


<Link to="/contato" onClick={fecharMenu}>
  Contato
</Link>


<Link to="/perguntas" onClick={fecharMenu}>
  Perguntas Frequentes
</Link>




        <div className="redes-menu">


          <a 
            href="https://www.instagram.com/e.xamanicopenabranca"
            target="_blank"
          >

            <img 
              src={instagram}
              alt="Instagram"
            />

          </a>




          <a 
            href="https://wa.me/5534988434935"
            target="_blank"
          >

            <img 
              src={whats}
              alt="WhatsApp"
            />

          </a>



        </div>



      </nav>


    </>

  );

}


export default MenuMobile;