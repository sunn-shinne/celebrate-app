import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAI16oiYx3ixS5knCcaCy5vK0xUJz5y9wc",
  authDomain: "celebrate-b6278.firebaseapp.com",
  projectId: "celebrate-b6278",
  storageBucket: "celebrate-b6278.appspot.com",
  messagingSenderId: "101419365668",
  appId: "1:101419365668:web:e645c4d49cc26f8680efb1",
  measurementId: "G-EWYDNM0WDM",
};

export const CELEBRATE_APP = initializeApp(firebaseConfig);
export const CELEBRATE_AUTH = getAuth(CELEBRATE_APP);
