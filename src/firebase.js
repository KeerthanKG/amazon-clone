import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMep6tNK0iNqfUUjR5Yoj6Py51q1EQctM",
    authDomain: "clone-e8dd6.firebaseapp.com",
    projectId: "clone-e8dd6",
    storageBucket: "clone-e8dd6.firebasestorage.app",
    messagingSenderId: "737996493161",
    appId: "1:737996493161:web:392c4bd21bbf6b147cedf8",
    measurementId: "G-XN27CVQX8C"

};


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth } 