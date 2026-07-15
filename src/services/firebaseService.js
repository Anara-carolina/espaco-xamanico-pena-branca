import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";

import { db } from "../firebase/config";



// =============================
// SALVAR CONTATO
// =============================

export async function salvarContato(dados) {


  console.log(
    "Dados recebidos:",
    dados
  );


  try {


    const documento = await addDoc(

      collection(db, "contatos"),

      {

        ...dados,

        criadoEm: serverTimestamp()

      }

    );



    console.log(

      "Documento contato criado:",

      documento.id

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
// SALVAR ANAMNESE
// =============================

export async function salvarAnamnese(dados) {


  console.log(

    "Dados da anamnese:",

    dados

  );



  try {


    const documento = await addDoc(

      collection(db, "anamneses"),

      {


        ...dados,


        criadoEm: serverTimestamp()


      }

    );



    console.log(

      "Documento anamnese criado:",

      documento.id

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