import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  getDoc,
  deleteDoc
} from "firebase/firestore";

import { db } from "../firebase/config";



// =============================
// SALVAR CONTATO
// =============================

export async function salvarContato(dados) {

  try {

    const documento = await addDoc(

      collection(db, "contatos"),

      {

        ...dados,

        criadoEm: serverTimestamp()

      }

    );


    return documento.id;


  } catch (error) {

    console.error(
      "Erro ao salvar contato:",
      error
    );

    throw error;

  }

}



// =============================
// BUSCAR CONTATOS
// =============================

export async function buscarContatos() {

  try {

    const resultado = await getDocs(

      collection(db, "contatos")

    );


    return resultado.docs.map((documento) => ({

      id: documento.id,

      ...documento.data()

    }));


  } catch (error) {

    console.error(
      "Erro ao buscar contatos:",
      error
    );

    throw error;

  }

}



// =============================
// REMOVER CONTATO
// =============================

export async function removerContato(id) {

  try {

    await deleteDoc(

      doc(db, "contatos", id)

    );


  } catch (error) {

    console.error(
      "Erro ao remover contato:",
      error
    );

    throw error;

  }

}





// =============================
// SALVAR ANAMNESE
// =============================

export async function salvarAnamnese(dados) {

  try {

    const documento = await addDoc(

      collection(db, "anamneses"),

      {

        ...dados,

        criadoEm: serverTimestamp()

      }

    );


    return documento.id;


  } catch (error) {

    console.error(

      "Erro ao salvar anamnese:",

      error

    );

    throw error;

  }

}



// =============================
// BUSCAR TODAS ANAMNESES
// =============================

export async function buscarAnamneses() {

  try {

    const resultado = await getDocs(

      collection(db, "anamneses")

    );


    return resultado.docs.map((documento) => ({

      id: documento.id,

      ...documento.data()

    }));


  } catch (error) {

    console.error(

      "Erro ao buscar anamneses:",

      error

    );

    throw error;

  }

}



// =============================
// BUSCAR UMA ANAMNESE
// =============================

export async function buscarAnamnesePorId(id) {

  try {

    const referencia = doc(

      db,

      "anamneses",

      id

    );


    const resultado = await getDoc(

      referencia

    );


    if (resultado.exists()) {


      return {

        id: resultado.id,

        ...resultado.data()

      };


    }


    return null;


  } catch (error) {

    console.error(

      "Erro ao buscar anamnese:",

      error

    );

    throw error;

  }

}





// =============================
// SALVAR CERIMÔNIA
// =============================

export async function salvarCerimonia(dados) {

  try {


    const documento = await addDoc(

      collection(db, "cerimonias"),

      {

        ...dados,

        criadoEm: serverTimestamp()

      }

    );


    return documento.id;


  } catch (error) {


    console.error(

      "Erro ao salvar cerimônia:",

      error

    );


    throw error;


  }

}





// =============================
// BUSCAR CERIMÔNIAS
// =============================

export async function buscarCerimonias() {

  try {


    const resultado = await getDocs(

      collection(db, "cerimonias")

    );


    return resultado.docs.map((documento) => ({


      id: documento.id,


      ...documento.data()


    }));


  } catch (error) {


    console.error(

      "Erro ao buscar cerimônias:",

      error

    );


    throw error;


  }

}





// =============================
// REMOVER CERIMÔNIA
// =============================

export async function removerCerimonia(id) {

  try {


    await deleteDoc(

      doc(db, "cerimonias", id)

    );


  } catch (error) {


    console.error(

      "Erro ao remover cerimônia:",

      error

    );


    throw error;


  }

}