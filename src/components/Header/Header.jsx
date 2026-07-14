import logo from "../../assets/imagens/logonome.png";
import menu from "../../assets/imagens/menu.png";
import "./Header.css";

function Header() {
  return (
    <header className="header">

      <button className="menu-button">
        <img src={menu} alt="Abrir menu" />
      </button>

      <img 
        className="logo"
        src={logo}
        alt="Espaço Xamânico Pena Branca"
      />

    </header>
  );
}

export default Header;