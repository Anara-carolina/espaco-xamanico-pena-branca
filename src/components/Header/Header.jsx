
import { useState } from "react";

import { FiMenu } from "react-icons/fi";

import logo from "../../assets/imagens/logonome.png";

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
          aria-label="Abrir menu"
        >

          <FiMenu />

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
