// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC23iC8Kk6F9zloMpajhRVmn6KOSo5o4FA",
    authDomain: "discusshub-b96dc.firebaseapp.com",
    projectId: "discusshub-b96dc",
    storageBucket: "discusshub-b96dc.firebasestorage.app",
    messagingSenderId: "955944416019",
    appId: "1:955944416019:web:c9c011c160a3d302ec20e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth
