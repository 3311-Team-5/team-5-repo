import { app } from './firebase.js';
import { getDatabase, ref, set, push, get, child } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

const db = getDatabase(app);
const clientList = document.getElementById("Client-List");


//------------------------------------------------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------------------------------------------------
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
 //once a client button is clicked, function addLocation() will show List of alreadyLocations, and display an add location button, the added location will be attached to client
    //once a client button is clicked function addLocation() give the option to add a Location to the client in the databse
//------------------------------------------------------------------------------------------------------------------------------

/*
const addLocation = (clientName) => {
    // Prompt the user to enter a location
    const location = prompt(`Enter location for client ${clientName}:`);
    if (location) {
        const dbRef = ref(getDatabase());
        const clientsRef = ref(dbRef, 'clients/');

        // Get the client's unique key based on their name
        get(child(clientsRef, clientName))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const clientKey = snapshot.key;

                    // Create a location object with the provided location
                    const locationObject = {
                        location: location
                    };

                    // Set the location under the client object
                    set(ref(clientsRef, `${clientKey}/location`), locationObject)
                        .then(() => {
                            alert(`Location "${location}" added to client "${clientName}".`);
                            // You can update the client list here to reflect the changes.
                            displayClients();
                        })
                        .catch((error) => {
                            console.error("Error adding location: ", error);
                        });
                } else {
                    console.error(`Client "${clientName}" not found.`);
                }
            })
            .catch((error) => {
                console.error("Error getting client: ", error);
            });
    }
}
*/


const addLocation = (clientName) => {
    // Prompt the user to enter a location
    const location = prompt(`Enter location for client ${clientName}:`);

    if (location) {
        const dbRef = ref(getDatabase(app));
        const clientsRef = ref(dbRef, 'clients');

        // Get the client's unique key based on their name
        get(child(clientsRef, clientName))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const clientKey = snapshot.key;

                    // Create a location object with the provided location
                    const locationObject = {
                        location: location
                    };

                    // Set the location under the client object
                    set(ref(clientsRef, `${clientKey}/location`), locationObject)
                        .then(() => {
                            alert(`Location "${location}" added to client "${clientName}".`);
                            // You can update the client list here to reflect the changes.
                            displayClients();
                        })
                        .catch((error) => {
                            console.error("Error adding location: ", error);
                        });
                } else {
                    console.error(`Client "${clientName}" not found.`);
                }
            })
            .catch((error) => {
                console.error("Error getting client: ", error);
            });
    }
}


/*
const addLocation = (clilentName) => {
    const location = document.querySelector("#location").value;
    const dbRef = ref(getDatabase());
    let count = 0;

    get(child(dbRef, `clients/${clientName}`)) //would somehow have to specify the path clientUniqueId/clientname
    .then((snapshot) => {
        for(var obj in snapshot.val()) //LOOP THROUGH OBJECT OF OBJECTS
        {
            let keyIndex = Object.keys(snapshot.val()[obj]).indexOf('location');// RETURNS INDEX OF KEY IF EXISTS IN OBJECT, ELSE RETURN -1
            let valIndex = Object.values(snapshot.val()[obj]).indexOf(client); // RETURNS INDEX OF VALUE IF EXISTS IN OBJECT, ELSE RETURN -1
            if(keyIndex === valIndex){ // IF THE KEY INDEX AND VAL INDEX ARE AT THE SAME VALUE, RUN ALERT
                alert("Location " + location + " has already been added");
                break;
            }
            else
            {
                count++; // KEEPS COUNT OF THE NUMBER OF OBJECTS PASSED
            }
        }
        if(count === Object.keys(snapshot.val()).length) // IF NUMBER OF OBJECTS PASSED EQUALS THE OBJECT LENGTH, CREATE NEW CLIENT
        {
            set(push(ref(db, 'clients/')), { //would somehow have to specify the path clientUniqueId/clientname
                location: location
            })
            .then(() => {
                //displayClients();
                alert("Location " + location + " has been added!");
                
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
*/

const addClientButton = document.getElementById("addClientButton");
addClientButton.addEventListener('click', addClient);
displayClients();