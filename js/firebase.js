import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

/* =========================
   YOUR FIREBASE CONFIG
   (from Firebase Console)
========================= */

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "wedding-tracker-bed3d.firebaseapp.com",
    projectId: "wedding-tracker-bed3d",
    storageBucket: "wedding-tracker-bed3d.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

/* =========================
   INIT FIREBASE
========================= */

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, deleteDoc, doc, onSnapshot };
