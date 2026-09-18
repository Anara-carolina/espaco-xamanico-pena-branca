import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "../firebase/config";



// =====================================================
// SALVAR CONTATO
// =====================================================

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



// =====================================================
// BUSCAR CONTATOS
// =====================================================

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



// =====================================================
// REMOVER CONTATO
// =====================================================

export async function removerContato(id) {

  try {

    await deleteDoc(

      doc(
        db,
        "contatos",
        id
      )

    );

  } catch (error) {

    console.error(
      "Erro ao remover contato:",
      error
    );

    throw error;

  }

}



// =====================================================
// SALVAR ANAMNESE
// =====================================================

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



// =====================================================
// BUSCAR TODAS AS ANAMNESES
// =====================================================

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



// =====================================================
// BUSCAR UMA ANAMNESE
// =====================================================

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



// =====================================================
// EXCLUIR ANAMNESE
// =====================================================

export async function excluirAnamnese(id) {

  try {

    if (!id) {

      throw new Error(
        "ID da ficha não informado."
      );

    }

    await deleteDoc(

      doc(
        db,
        "anamneses",
        id
      )

    );

  } catch (error) {

    console.error(
      "Erro ao excluir anamnese:",
      error
    );

    throw error;

  }

}



// =====================================================
// SALVAR CERIMÔNIA
// =====================================================

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



// =====================================================
// BUSCAR CERIMÔNIAS
// =====================================================

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



// =====================================================
// REMOVER CERIMÔNIA
// =====================================================

export async function removerCerimonia(id) {

  try {

    await deleteDoc(

      doc(
        db,
        "cerimonias",
        id
      )

    );

  } catch (error) {

    console.error(
      "Erro ao remover cerimônia:",
      error
    );

    throw error;

  }

}



// =====================================================
// SALVAR AUTORIZAÇÃO DE MENOR
// =====================================================
//
// A autorização é salva em uma coleção própria:
//
// autorizacoesMenores
//
// Isso permite consultar as autorizações separadamente
// no painel administrativo.
//

export async function salvarAutorizacaoMenor(dados) {

  try {

    if (!dados) {

      throw new Error(
        "Dados da autorização não informados."
      );

    }

    const documento = await addDoc(

      collection(db, "autorizacoesMenores"),

      {
        ...dados,

        status: dados.status || "Autorizada",

        criadoEm: serverTimestamp(),

        atualizadoEm: serverTimestamp()

      }

    );

    return documento.id;

  } catch (error) {

    console.error(
      "Erro ao salvar autorização de menor:",
      error
    );

    throw error;

  }

}



// =====================================================
// BUSCAR TODAS AS AUTORIZAÇÕES DE MENORES
// =====================================================

export async function buscarAutorizacoesMenores() {

  try {

    const resultado = await getDocs(

      collection(db, "autorizacoesMenores")

    );

    return resultado.docs.map((documento) => ({

      id: documento.id,

      ...documento.data()

    }));

  } catch (error) {

    console.error(
      "Erro ao buscar autorizações de menores:",
      error
    );

    throw error;

  }

}



// =====================================================
// BUSCAR UMA AUTORIZAÇÃO DE MENOR
// =====================================================

export async function buscarAutorizacaoMenorPorId(id) {

  try {

    if (!id) {

      throw new Error(
        "ID da autorização não informado."
      );

    }

    const referencia = doc(

      db,
      "autorizacoesMenores",
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
      "Erro ao buscar autorização de menor:",
      error
    );

    throw error;

  }

}



// =====================================================
// VINCULAR AUTORIZAÇÃO À ANAMNESE
// =====================================================
//
// Depois que a anamnese for salva, essa função coloca
// o ID da anamnese dentro da autorização e o ID da
// autorização dentro da anamnese.
//

export async function vincularAutorizacaoMenor(
  autorizacaoId,
  anamneseId
) {

  try {

    if (!autorizacaoId) {

      throw new Error(
        "ID da autorização não informado."
      );

    }

    if (!anamneseId) {

      throw new Error(
        "ID da anamnese não informado."
      );

    }

    await updateDoc(

      doc(
        db,
        "autorizacoesMenores",
        autorizacaoId
      ),

      {
        anamneseId: anamneseId,

        atualizadoEm: serverTimestamp()

      }

    );

    await updateDoc(

      doc(
        db,
        "anamneses",
        anamneseId
      ),

      {
        autorizacaoMenorId: autorizacaoId,

        possuiAutorizacaoMenor: true,

        atualizadoEm: serverTimestamp()

      }

    );

  } catch (error) {

    console.error(
      "Erro ao vincular autorização à anamnese:",
      error
    );

    throw error;

  }

}



// =====================================================
// ATUALIZAR AUTORIZAÇÃO DE MENOR
// =====================================================

export async function atualizarAutorizacaoMenor(
  id,
  dados
) {

  try {

    if (!id) {

      throw new Error(
        "ID da autorização não informado."
      );

    }

    await updateDoc(

      doc(
        db,
        "autorizacoesMenores",
        id
      ),

      {
        ...dados,

        atualizadoEm: serverTimestamp()

      }

    );

  } catch (error) {

    console.error(
      "Erro ao atualizar autorização de menor:",
      error
    );

    throw error;

  }

}