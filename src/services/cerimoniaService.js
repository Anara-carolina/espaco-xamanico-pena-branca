import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "../firebase/config";



const referenciaCerimonias = collection(
  db,
  "cerimonias"
);







// ============================
// BUSCAR CERIMÔNIAS
// ============================


export async function buscarCerimonias(){


  const resultado = await getDocs(
    referenciaCerimonias
  );


  return resultado.docs.map((documento)=>(


    {

      id: documento.id,

      ...documento.data()

    }


  ));


}











// ============================
// SALVAR CERIMÔNIA
// ============================


export async function salvarCerimonia(dados){


  await addDoc(

    referenciaCerimonias,

    dados

  );


}











// ============================
// ATUALIZAR CERIMÔNIA COMPLETA
// ============================


export async function atualizarCerimonia(id, dados){


  const referenciaDocumento = doc(

    db,

    "cerimonias",

    id

  );



  await updateDoc(

    referenciaDocumento,

    dados

  );


}











// ============================
// ATUALIZAR SOMENTE IMAGEM
// ============================


export async function atualizarImagemCerimonia(id, imagem){


  const referenciaDocumento = doc(

    db,

    "cerimonias",

    id

  );



  await updateDoc(

    referenciaDocumento,

    {

      imagem: imagem

    }

  );


}











// ============================
// REMOVER CERIMÔNIA
// ============================


export async function removerCerimonia(id){


  await deleteDoc(

    doc(

      db,

      "cerimonias",

      id

    )

  );


}