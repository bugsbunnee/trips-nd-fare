// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW935UMhvjYnig4Q8PPa7bqtArCGmrpxc",
  authDomain: "trips-nd-fare.firebaseapp.com",
  projectId: "trips-nd-fare",
  storageBucket: "trips-nd-fare.appspot.com",
  messagingSenderId: "539840046268",
  appId: "1:539840046268:web:369e1a78ac0b0bd2b79cb9",
  measurementId: "G-ETZTS59M1D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);