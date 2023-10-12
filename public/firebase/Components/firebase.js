import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

// Firebase Config
export const firebaseConfig = {
  apiKey: "AIzaSyAIznKAfKHNhFiilD-kPTygU3J0hqrBQaw",
  authDomain: "team-5-techlog-ff0c3.firebaseapp.com",
  databaseURL: "https://team-5-techlog-ff0c3-default-rtdb.firebaseio.com",
  projectId: "team-5-techlog-ff0c3",
  storageBucket: "team-5-techlog-ff0c3.appspot.com",
  messagingSenderId: "132311870048",
  appId: "1:132311870048:web:c20eeee77a46ca67e2b105"
};

// console.log("FIREBASE.JS!!!!!")
export const app = initializeApp(firebaseConfig);