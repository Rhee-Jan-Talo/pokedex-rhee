
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDuHNYvobnOZI-onFtZMdcb_kx9MnEFCOY",
  authDomain: "pokedex-rhee.firebaseapp.com",
  projectId: "pokedex-rhee",
  storageBucket: "pokedex-rhee.appspot.com",
  messagingSenderId: "253027253279",
  appId: "1:253027253279:web:3a88814bd5faf2f96fa92a",
  measurementId: "G-LWEF9BDPTX"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)