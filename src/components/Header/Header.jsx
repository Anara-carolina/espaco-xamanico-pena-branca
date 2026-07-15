import { useState } from "react";

import logo from "../../assets/imagens/logonome.png";
import menu from "../../assets/imagens/menu.png";

import MenuMobile from "../MenuMobile/MenuMobile";

import "./Header.css";


function Header() {


  const [menuAberto, setMenuAberto] = useState(false);



  return (

    <>

      <header className="header">


        <button
          className="menu-button"
          onClick={() => setMenuAberto(true)}
        >

          <img 
            src={menu}
            alt="Abrir menu"
          />

        </button>



        <img 
          className="logo"
          src={logo}
          alt="Espaço Xamânico Pena Branca"
        />


      </header>



      <MenuMobile

        aberto={menuAberto}

        fecharMenu={() => setMenuAberto(false)}

      />


    </>

  );

}


export default Header;