// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlYoii5QDoJ7sQNC8DafkNHpBsAhKNEsg",
  authDomain: "info5143-katt-final-project.firebaseapp.com",
  projectId: "info5143-katt-final-project",
  storageBucket: "info5143-katt-final-project.firebasestorage.app",
  messagingSenderId: "495152042045",
  appId: "1:495152042045:web:205f3da1710518986a5a54"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()