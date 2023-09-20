// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdU5day3_NXF8l7aS3DwgjAoKSgmFW91I",
  authDomain: "image-gallery-c5da1.firebaseapp.com",
  projectId: "image-gallery-c5da1",
  storageBucket: "image-gallery-c5da1.appspot.com",
  messagingSenderId: "435341578623",
  appId: "1:435341578623:web:d34dc4728849aa86b4ca4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);