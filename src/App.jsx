import { Routes, Route } from "react-router-dom";


import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";


import Home from "./pages/Home/Home";
import Sobre from "./pages/Sobre/Sobre";
import Agenda from "./pages/Agenda/Agenda";
import Galeria from "./pages/Galeria/Galeria";
import Login from "./pages/Login/Login";
import Anamnese from "./pages/Anamnese/Anamnese";
import Contato from "./pages/Contato/Contato";
import Cerimonias from "./pages/Cerimonias/Cerimonias";
import Perguntas from "./pages/Perguntas/Perguntas";


import Ayahuasca from "./pages/MedicinaDetalhe/Ayahuasca";
import Rape from "./pages/MedicinaDetalhe/Rape";
import Sananga from "./pages/MedicinaDetalhe/Sananga";
import Kambo from "./pages/MedicinaDetalhe/Kambo";



function App() {


  return (

    <>

      <ScrollToTop />


      <Routes>



        {/* LOGIN */}

        <Route

          path="/login"

          element={<Login />}

        />





        {/* ANAMNESE PROTEGIDA */}

        <Route

          path="/anamnese"

          element={

            <PrivateRoute>

              <Anamnese />

            </PrivateRoute>

          }

        />







        {/* SITE PRINCIPAL */}


        <Route element={<Layout />}>



          <Route

            path="/"

            element={<Home />}

          />



          <Route

            path="/sobre"

            element={<Sobre />}

          />



          <Route

            path="/agenda"

            element={<Agenda />}

          />



          <Route

            path="/galeria"

            element={<Galeria />}

          />



          <Route

            path="/cerimonias"

            element={<Cerimonias />}

          />



          <Route

            path="/contato"

            element={<Contato />}

          />



          <Route

            path="/perguntas"

            element={<Perguntas />}

          />







          <Route

            path="/medicinas/ayahuasca"

            element={<Ayahuasca />}

          />



          <Route

            path="/medicinas/rape"

            element={<Rape />}

          />



          <Route

            path="/medicinas/sananga"

            element={<Sananga />}

          />



          <Route

            path="/medicinas/kambo"

            element={<Kambo />}

          />



        </Route>



      </Routes>


    </>

  );

}



export default App;