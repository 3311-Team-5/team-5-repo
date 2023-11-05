import { app } from './firebase.js';
import { getDatabase, ref, set, push, get, child } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

const db = getDatabase(app);
const clientList = document.getElementById("Client-List");

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
                // displayClients();
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
//once a client button is clicked function addLocation() give the option to add a Location to the client in the databse
//------------------------------------------------------------------------------------------------------------------------------
const addLocation = (clientName) => {
    const locationName = prompt("Enter the location name:");
    if (!locationName) {
      alert("Location name cannot be empty.");
      return;
    }
  
    const db = getDatabase(app); // SHOULD NOT NEED THIS LINE SINCE IT IS CALLED GLOBALLY
  
    const clientsRef = ref(db, 'clients');
  
    // Query the database to find the client's unique key based on their name
    get(clientsRef)
      .then((snapshot) => {
        const clientsData = snapshot.val();
        const clientKey = Object.keys(clientsData).find((key) => clientsData[key].client === clientName);
  
        if (clientKey) {
          // The client exists, add the location under the existing client

          //this is where you add the check for unique location name
          
          const clientLocationsRef = ref(db, `clients/${clientKey}/locations`);
          const newLocationRef = push(clientLocationsRef);
  
          // Set the location data (you can add more properties if needed)
          set(newLocationRef, {
            name: locationName,
            // Other properties specific to the location
          })
            .then(() => {
              // Location added successfully
              alert(`Location "${locationName}" added for client "${clientName}"`);
            })
            .catch((error) => {
              console.error(`Error adding location: ${error}`);
            });
        } else {
          alert(`Client "${clientName}" does not exist. Please add the client first.`);
        }
      })
      .catch((error) => {
        console.error(`Error querying the database: ${error}`);
      });
  };
//--------------------------------------------------------------------------------------
//does not work
const addComputer = () => {
    const computerName = document.querySelector("#computer").value;
    
    const clientName = prompt("Enter the client name:");
        if (!clientName) {
        alert("Client name cannot be empty.");
        return;
    }

    const locationName = prompt("Enter the location name:");
        if (!locationName) {
        alert("Location name cannot be empty.");
        return;
    }
    
    const db = getDatabase(app);
  
    const clientsRef = ref(db, 'clients');
  
    // Query the database to find the client's unique key based on their name
    get(clientsRef)
      .then((snapshot) => {
        const clientsData = snapshot.val();
        const clientKey = Object.keys(clientsData).find((key) => clientsData[key].client === clientName);
  
        if (clientKey) {
          // The client exists, add the computer under the existing client and location
  
          const clientLocationsRef = ref(db, `clients/${clientKey}/locations`);
          const locationKey = Object.keys(clientsData[clientKey].locations).find(
            (key) => clientsData[clientKey].locations[key].name === locationName
          );
  
          if (locationKey) {
            const locationComputersRef = ref(clientLocationsRef, locationKey + '/computers');
            const newComputerRef = push(locationComputersRef);
  
            // Set the computer data (you can add more properties if needed)
            set(newComputerRef, {
              name: computerName,
              // Other properties specific to the computer
            })
              .then(() => {
                // Computer added successfully
                alert(`Computer "${computerName}" added for location "${locationName}" and client "${clientName}"`);
              })
              .catch((error) => {
                console.error(`Error adding computer: ${error}`);
              });
          } else {
            alert(`Location "${locationName}" does not exist for client "${clientName}". Please add the location first.`);
          }
        } else {
          alert(`Client "${clientName}" does not exist. Please add the client first.`);
        }
      })
      .catch((error) => {
        console.error(`Error querying the database: ${error}`);
      });
  };
  

const addClientButton = document.getElementById("addClientButton");
addClientButton.addEventListener('click', addClient);
const addComputerButton = document.getElementById("addComputerButton");
addComputerButton.addEventListener('click', addComputer);
displayClients();