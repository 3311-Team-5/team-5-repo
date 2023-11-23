import { app } from './firebase.js';
import { addLocation } from './location.js';
import { addComputer } from './device.js';
import { getDatabase, ref, set, push, get, child } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

const db = getDatabase(app);
const clientList = document.getElementById("Client-List");
const computerList = document.getElementById("comp-List");
let computerName = "";

const displayClients = () => {
  const dbRef = ref(getDatabase(app));

  get(child(dbRef, "clients/"))
      .then((snapshot) => {
          const clientsData = snapshot.val();
          clientList.innerHTML = "";

          for (const key in clientsData) {
              const clientName = clientsData[key].client;

              const listItem = document.createElement("li");
              const button = document.createElement("button");
              //listItem.textContent = clientName;
              button.textContent = clientName;
              button.addEventListener("click", () => {
                  addLocation(clientName); //check for function that passes in some sort of path
                  //alert("Clicked on client: " +clientName);
              })
              listItem.appendChild(button);
              clientList.appendChild(listItem);
          }
      })
      .catch((error) => {
          console.error("Error fetching clients: ", error);
      });
};

const displayComputers = () => {
    const dbRef = ref(getDatabase(app));
  
    get(child(dbRef, "clients/"))
        .then((snapshot) => {
            const clientsData = snapshot.val();
            computerList.innerHTML = ""; // Clear the computer list
  
            for (const key in clientsData) {
                const clientName = clientsData[key].client;
                console.log(clientName + ' ' + key);
  
                // Check if the client has locations
                if (clientsData[key].locations) {
                    for (const locationKey in clientsData[key].locations) {
                        const location = clientsData[key].locations[locationKey];
  
                        // Check if the location has computers
                        if (location.computers) {
                            for (const computerKey in location.computers) {
                                const computer = location.computers[computerKey];
                                const computerName = computer.name;
  
                                const listItem = document.createElement("li");
                                const button = document.createElement("button");
                                button.textContent = `Client: ${clientName}, Location: ${location.name}, Computer: ${computerName}`;
                                
                                // Use a function to capture the correct computerKey
                                const clickHandler = (computerKey) => {
                                    return () => {
                                        const url = `../../card.html?key=${key}&lkey=${locationKey}&client=${clientName}&location=${location.name}&computer=${computerName}`; // ADDED UNIQUE KEY AND LOCATION KEY TO URL
                                        window.location.href = url;
                                    };
                                };
                                
                                button.addEventListener("click", clickHandler(computerName));

                                listItem.appendChild(button);
                                computerList.appendChild(listItem);
                            }
                        }
                    }
                }
            }
        })
        .catch((error) => {
            console.error("Error fetching computers: ", error);
        });
};


const addClient = () => {
    const client = document.querySelector("#client").value;
    const dbRef = ref(getDatabase());
    let count = 0;

    get(child(dbRef, `clients/`))
    .then((snapshot) => {
        for(var obj in snapshot.val()) //LOOP THROUGH OBJECT OF OBJECTS
        {
            let keyIndex = Object.keys(snapshot.val()[obj]).indexOf('client');// RETURNS INDEX OF KEY IF EXISTS IN OBJECT, ELSE RETURN -1
            let valIndex = Object.values(snapshot.val()[obj]).indexOf(client); // RETURNS INDEX OF VALUE IF EXISTS IN OBJECT, ELSE RETURN -1
            if(keyIndex === valIndex){ // IF THE KEY INDEX AND VAL INDEX ARE AT THE SAME VALUE, RUN ALERT
                alert("Client " + client + " has already been added");
                break;
            }
            else
            {
                count++; // KEEPS COUNT OF THE NUMBER OF OBJECTS PASSED
            }
        }
        if(count === Object.keys(snapshot.val()).length) // IF NUMBER OF OBJECTS PASSED EQUALS THE OBJECT LENGTH, CREATE NEW CLIENT
        {
            set(push(ref(db, 'clients/')), {
                client: client
            })
            .then(() => {
                displayClients();
                alert("Client " + client + " has been added!");
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + " " + errorMessage);
            })
        }
    })
    .catch((error) => {
        console.log(error.code + " " + error.message);
    }) 
}

const addClientButton = document.getElementById("addClientButton");
addClientButton.addEventListener('click', addClient);
const addComputerButton = document.getElementById("addComputerButton");
addComputerButton.addEventListener('click', addComputer);
displayClients();
displayComputers();