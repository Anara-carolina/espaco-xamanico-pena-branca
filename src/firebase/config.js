import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAqWWfKemUnd3nGa-FJtyGerdx9cLib9VQ",
  authDomain: "espaco-xamanico-pena-branca.firebaseapp.com",
  projectId: "espaco-xamanico-pena-branca",
  storageBucket: "espaco-xamanico-pena-branca.firebasestorage.app",
  messagingSenderId: "149953597312",
  appId: "1:149953597312:web:95883540dae0f4d7223b65"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export const db = getFirestore(app);