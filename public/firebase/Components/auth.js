import { app } from './firebase.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';

const auth = getAuth(app);

const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const signUpButton = document.querySelector("#signUpButton");
const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");
const loginContainer = document.getElementById("login-container");
const authenticatedContainer = document.getElementById("authenticated-container");

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

// shows the authenticated content and hide the login form
const showAuthenticatedContent = () => {
    loginContainer.style.display = "none";
    authenticatedContainer.style.display = "block";
    }
    
    // shows the login form and hide the authenticated content
const showLoginForm = () => {
    loginContainer.style.display = "block";
    authenticatedContainer.style.display = "none";
    }
    

const authState = async () => { // FIREBASE FUNCTION TO READ AUTHENTICATED STATE INTO CONDITIONAL
    onAuthStateChanged(auth, user => {
        if(user)
        {
            showAuthenticatedContent();
        }
        else
        {
            showLoginForm();
        }
    })
}

authState();

signUpButton.addEventListener('click', signUp);
signInButton.addEventListener('click', login);
signOutButton.addEventListener('click', logout);