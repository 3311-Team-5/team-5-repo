import { app } from './firebase.js';
import { getDatabase, ref, set, push, get, child } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
const db = getDatabase(app);
const addClient = () => {
  const client = document.querySelector("#client").value;
  const dbRef = ref(getDatabase());
  let count = 0;
  get(child(dbRef, `clients/`)).then(snapshot => {
    for (var obj in snapshot.val())
    //LOOP THROUGH OBJECT OF OBJECTS
    {
      let keyIndex = Object.keys(snapshot.val()[obj]).indexOf('client'); // RETURNS INDEX OF KEY IF EXISTS IN OBJECT, ELSE RETURN -1
      let valIndex = Object.values(snapshot.val()[obj]).indexOf(client); // RETURNS INDEX OF VALUE IF EXISTS IN OBJECT, ELSE RETURN -1
      if (keyIndex === valIndex) {
        // IF THE KEY INDEX AND VAL INDEX ARE AT THE SAME VALUE, RUN ALERT
        alert("Client " + client + " has already been added");
        break;
      } else {
        count++; // KEEPS COUNT OF THE NUMBER OF OBJECTS PASSED
      }
    }

    if (count === Object.keys(snapshot.val()).length)
      // IF NUMBER OF OBJECTS PASSED EQUALS THE OBJECT LENGTH, CREATE NEW CLIENT
      {
        set(push(ref(db, 'clients/')), {
          client: client
        }).then(() => {
          alert("Client " + client + " has been added!");
        }).catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
        });
      }
  }).catch(error => {
    console.log(error.code + " " + error.message);
  });
};

// addDevice = (brand, model, cpu, winKey, offKey, softKey, username, ramType, ramAmt, ramSize, hdType, hdAmt, hdSize) => {
//     db.ref()
// }

addClientButton.addEventListener('click', addClient);
// addDeviceButton.addEventListener('click', addDevice);