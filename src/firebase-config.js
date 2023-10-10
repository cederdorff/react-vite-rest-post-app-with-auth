// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwXQIxmiskVwawKHLI7v80G5VVEFtUP08",
    authDomain: "react-rest-and-auth.firebaseapp.com",
    databaseURL:
        "https://react-rest-and-auth-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-rest-and-auth",
    storageBucket: "react-rest-and-auth.appspot.com",
    messagingSenderId: "1037137825554",
    appId: "1:1037137825554:web:b065716ecf926d57f16dcb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
