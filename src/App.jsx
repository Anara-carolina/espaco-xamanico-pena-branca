import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import ScrollToTop from "./components/ScrollToTop";



// ===============================
// PÁGINAS PRINCIPAIS
// ===============================

import Home from "./pages/Home/Home";
import Sobre from "./pages/Sobre/Sobre";
import Agenda from "./pages/Agenda/Agenda";
import Galeria from "./pages/Galeria/Galeria";
import Login from "./pages/Login/Login";



// ===============================
// ADMIN
// ===============================

import LoginAdmin from "./pages/Admin/LoginAdmin";
import Dashboard from "./pages/Admin/Dashboard";
import CerimoniasAdmin from "./pages/Admin/CerimoniasAdmin";
import AnamnesesAdmin from "./pages/Admin/AnamnesesAdmin";
import AnamneseDetalhe from "./pages/Admin/AnamneseDetalhe";
import MensagensAdmin from "./pages/Admin/MensagensAdmin";



// ===============================
// USUÁRIO
// ===============================

import Anamnese from "./pages/Anamnese/Anamnese";
import Contato from "./pages/Contato/Contato";
import Cerimonias from "./pages/Cerimonias/Cerimonias";
import Perguntas from "./pages/Perguntas/Perguntas";



// ===============================
// MEDICINAS
// ===============================

import Ayahuasca from "./pages/MedicinaDetalhe/Ayahuasca";
import Rape from "./pages/MedicinaDetalhe/Rape";
import Sananga from "./pages/MedicinaDetalhe/Sananga";
import Kambo from "./pages/MedicinaDetalhe/Kambo";



function App() {

  return (

    <>

      <ScrollToTop />

      <Routes>

        {/* =========================
            LOGIN PÚBLICO
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />



        {/* =========================
            LOGIN ADMIN
        ========================= */}

        <Route
          path="/admin"
          element={<LoginAdmin />}
        />



        {/* =========================
            DASHBOARD ADMIN
        ========================= */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />



        {/* =========================
            GERENCIAR CERIMÔNIAS
        ========================= */}

        <Route
          path="/admin/cerimonias"
          element={
            <AdminRoute>
              <CerimoniasAdmin />
            </AdminRoute>
          }
        />



        {/* =========================
            LISTA DE ANAMNESES
        ========================= */}

        <Route
          path="/admin/anamneses"
          element={
            <AdminRoute>
              <AnamnesesAdmin />
            </AdminRoute>
          }
        />



        {/* =========================
            DETALHE DA ANAMNESE
        ========================= */}

        <Route
          path="/admin/anamnese/:id"
          element={
            <AdminRoute>
              <AnamneseDetalhe />
            </AdminRoute>
          }
        />



        {/* =========================
            MENSAGENS DE CONTATO
        ========================= */}

        <Route
          path="/admin/mensagens"
          element={
            <AdminRoute>
              <MensagensAdmin />
            </AdminRoute>
          }
        />



        {/* =========================
            ANAMNESE DO PARTICIPANTE
        ========================= */}

        <Route
          path="/anamnese"
          element={
            <PrivateRoute>
              <Anamnese />
            </PrivateRoute>
          }
        />



        {/* =========================
            SITE PRINCIPAL
        ========================= */}

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



          {/* =========================
              MEDICINAS
          ========================= */}

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