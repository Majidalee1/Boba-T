// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDcQReHS0ZGehjk6GGwoPQSyla62MOfcRY",
    authDomain: "bubble-tea-f3d52.firebaseapp.com",
    projectId: "bubble-tea-f3d52",
    storageBucket: "bubble-tea-f3d52.appspot.com",
    messagingSenderId: "362244652400",
    appId: "1:362244652400:web:9465f5fc3f5818dcfd63b5",
    measurementId: "G-BHGLTWSSRB"
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = getAuth();
// const db = initializeFirestore();
const db = initializeFirestore(app, { experimentalForceLongPolling: true })

const storage = getStorage();
export { auth, db, storage };