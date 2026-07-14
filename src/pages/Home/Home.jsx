import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import CardEvento from "../../components/CardEvento/CardEvento";
import Button from "../../components/Button/Button";
import CardGaleria from "../../components/CardGaleria/CardGaleria";
import CardVideo from "../../components/CardVideo/CardVideo";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Newsletter from "../../components/Newsletter/Newsletter";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <CardEvento />
      <Button />
      <CardGaleria />
      <CardVideo />
      <Footer />
      <Navbar />
      <Newsletter />
    </>
  );
}

export default Home;