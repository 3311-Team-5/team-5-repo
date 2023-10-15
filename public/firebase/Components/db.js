import { app } from './firebase.js';
import { getDatabase, ref, set, push } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

const db = getDatabase(app);

const addClient = async () => { // CURRENTLY: DUPLICATES CLIENT. NEED TO CREATE CONDITIONAL TO SEE IF CLIENT NAME EXISTS
    const client = document.querySelector("#client").value;
    
    console.log("CLIENT IS " + client);
    set(push(ref(db, 'clients')), {
        client: client
    })
    .then(() => {
        alert("Client " + client + " has been added!");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
        // alert()
    })
}

// addDevice = (brand, model, cpu, winKey, offKey, softKey, username, ramType, ramAmt, ramSize, hdType, hdAmt, hdSize) => {
//     db.ref()
// }

addClientButton.addEventListener('click', addClient);
// addDeviceButton.addEventListener('click', addDevice);