import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCRSXp8UVX422xqCK5yAiunf9wd82Mg3pY",
    authDomain: "aniplay-db0d9.firebaseapp.com",
    databaseURL: "https://aniplay-db0d9-default-rtdb.firebaseio.com",
    projectId: "aniplay-db0d9",
    storageBucket: "aniplay-db0d9.appspot.com",
    messagingSenderId: "853053303076",
    appId: "1:853053303076:web:7e74a5d5823593b704ebb1",
    measurementId: "G-ECJ9Q6N7FP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);