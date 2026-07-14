import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import CardEvento from "../../components/CardEvento/CardEvento";
import Button from "../../components/Button/Button";
import CardGaleria from "../../components/CardGaleria/CardGaleria";
import Footer from "../../components/Footer/Footer";
import CardMedicina from "../../components/CardMedicina/CardMedicina";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <CardEvento />
      <Button />
      <CardGaleria />
      <CardMedicina />
      <Footer />
    </>
  );
}

export default Home;