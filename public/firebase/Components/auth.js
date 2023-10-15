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
        alert("Your account " + email + " has been created");
    })
    .catch((error) => { // ON ERROR, ALERT MESSAGE TO USER
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
        if(errorMessage.localeCompare("Firebase: Error (auth/invalid-email).") == 0)
        {
            alert(email + " is not a valid email address\nPlease use a valid email address");
        }
        else if(errorMessage.localeCompare("Firebase: Password should be at least 6 characters (auth/weak-password).") == 0)
        {
            alert("Password is not at least 6 characters\nPlease input a valid password");
        }
        else if(errorMessage.localeCompare("Firebase: Error (auth/missing-password).") == 0)
        {
            alert("Password is missing\nPlease input a valid password");
        }
        else if(errorMessage.localeCompare("Firebase: Error (auth/email-already-in-use).") == 0)
        {
            alert("Email is already in use\nPlease log in or use a new email address");
        }
    })
};

const login = async () => {
    const email = userEmail.value;
    const password = userPassword.value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { // SIGN IN SUCCESSFUL
        const user = userCredential.user;
        console.log(user);
        alert("User "+ email +" has been signed in");
    })
    .catch((error) => { // ON ERROR, ALERT MESSAGE TO USER
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
        if(errorMessage.localeCompare("Firebase: Error (auth/invalid-login-credentials).") == 0)
        {
            alert("Invalid login credentials\nPlease try again");
        }
        else if(errorMessage.localeCompare("Firebase: Error (auth/invalid-email).") == 0)
        {
            alert("Invalid email address\nPlease try again");
        }
    })
};

const logout = async () => {
    // const user = auth.currentUser;
    // if(user)
    // {
        signOut(auth)
        .then(() => { // SIGN OUT SUCCESSFUL
            alert("Sign out successful!");
        })
        .catch(() => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage);
        })
    // }
    // else{
    //     alert("No user is currently signed in");
    // }
};

signUpButton.addEventListener('click', signUp);
signInButton.addEventListener('click', login);
signOutButton.addEventListener('click', logout);