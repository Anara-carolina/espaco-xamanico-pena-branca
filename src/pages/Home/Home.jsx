import Hero from "../../components/Hero/Hero";
import CardEvento from "../../components/CardEvento/CardEvento";
import Button from "../../components/Button/Button";
import CardGaleria from "../../components/CardGaleria/CardGaleria";
import CardMedicina from "../../components/CardMedicina/CardMedicina";

function Home() {
  return (
    <>
      <Hero />
      <CardEvento />
      <Button />
      <CardGaleria />
      <CardMedicina />
    </>
  );
}

export default Home;