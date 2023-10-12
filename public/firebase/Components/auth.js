import { app } from './firebase.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';

// console.log("AUTH.JS!!!!");
const auth = getAuth(app);

const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const form = document.querySelector("#form");
const authenticate = document.querySelector("#authenticate");
const signUpButton = document.querySelector("#signUpButton");
const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const signUp = async () => {
    const email = userEmail.value;
    const password = userPassword.value;
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { // SIGN IN SUCCESSFUL
        const user = userCredential.user;
        console.log(user);
        alert("Created and signed in!");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + errorMessage);
    })
}

const login = async () => {
    const email = userEmail.value;
    const password = userEmail.value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { // SIGN IN SUCCESSFUL
        const user = userCredential.user;
        console.log(user);
        alert("Sign in successful!");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + errorMessage);
    })
}

const logout = async () => {
    signOut(auth)
    .then(() => { // SIGN OUT SUCCESSFUL
        alert("Sign out successful!");
    })
    .catch(() => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + errorMessage);
    })
}

signUpButton.addEventListener('click', signUp);
signInButton.addEventListener('click', login);
signOutButton.addEventListener('click', logout);