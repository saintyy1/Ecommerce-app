import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyAVuErb3AC_Nw13m8NA0q6uI5MVdO_OeV4",
    authDomain: "shopnow-6cd6e.firebaseapp.com",
    projectId: "shopnow-6cd6e",
    storageBucket: "shopnow-6cd6e.firebasestorage.app",
    messagingSenderId: "681082044523",
    appId: "1:681082044523:web:aeea5b9ab66b853740f12e",
    measurementId: "G-C8PQEVS510",
    clientId: "180157567183-hjr2j05l4u854anveiqdd4g5nmb5jeac.apps.googleusercontent.com",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;