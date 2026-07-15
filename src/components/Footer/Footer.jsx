import { Link } from "react-router-dom";

import "./Footer.css";

import logo from "../../assets/imagens/logonome.png";
import instagram from "../../assets/imagens/instagram.png";
import whats from "../../assets/imagens/whats.png";


function Footer() {


  return (

    <footer className="footer">



      <img

        src={logo}

        alt="Espaço Xamânico Pena Branca"

        className="logo-footer"

      />





      <p className="frase-footer">

        "Entre a força da floresta e a sabedoria ancestral,
        caminhamos em conexão, amor e respeito."

      </p>






      <div className="redes-footer">



        <a

          href="https://www.instagram.com/e.xamanicopenabranca?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="

          target="_blank"

          rel="noreferrer"

        >


          <img

            src={instagram}

            alt="Instagram"

          />


        </a>







        <a

          href="https://wa.me/5534988434935"

          target="_blank"

          rel="noreferrer"

        >


          <img

            src={whats}

            alt="WhatsApp"

          />


        </a>




      </div>







      <nav className="menu-footer">



        <Link to="/">
          Início
        </Link>



        <Link to="/sobre">
          Sobre
        </Link>



        <Link to="/medicinas/ayahuasca">
          Medicinas
        </Link>



        <Link to="/galeria">
          Galeria
        </Link>



        <Link to="/agenda">
          Agenda
        </Link>



        <Link to="/contato">
          Contato
        </Link>



      </nav>







      <div className="linha-footer"></div>







      <p className="copyright">

        © 2026 Espaço Xamânico Pena Branca

      </p>





    </footer>

  );

}



export default Footer;