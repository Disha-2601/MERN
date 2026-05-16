
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "hireiq-ebea0.firebaseapp.com",
  projectId: "hireiq-ebea0",
  storageBucket: "hireiq-ebea0.firebasestorage.app",
  messagingSenderId: "485781021703",
  appId: "1:485781021703:web:fe0c36ad6a518fe0e5b6a2"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth , provider};