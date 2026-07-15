import logo from "../../assets/imagens/logonome.png";
import instagram from "../../assets/imagens/instagram.png";
import whats from "../../assets/imagens/whats.png";

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





        <a href="/" onClick={fecharMenu}>
          Início
        </a>


        <a href="#sobre" onClick={fecharMenu}>
          Sobre Nós
        </a>


        <a href="#medicinas" onClick={fecharMenu}>
          Medicinas
        </a>


        <a href="#galeria" onClick={fecharMenu}>
          Galeria
        </a>


        <a href="#agenda" onClick={fecharMenu}>
          Agenda
        </a>


        <a href="#anamnese" onClick={fecharMenu}>
          Anamnese
        </a>


        <a href="#contato" onClick={fecharMenu}>
          Contato
        </a>





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