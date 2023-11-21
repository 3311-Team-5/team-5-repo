import { app } from './firebase.js';
import { addLocation } from './location.js';

import { addComputer } from './device.js';
import { getDatabase, ref, set, push, get, child } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

const db = getDatabase(app);
const clientList = document.getElementById("Client-List");
const computerList = document.getElementById("comp-List");
const locationList = document.getElementById("Location-List");
let computerName = "";
let currentClient = "";


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
                  
                  displayLocation(clientName);



              })
              listItem.appendChild(button);
              clientList.appendChild(listItem);
          }
      })
      .catch((error) => {
          console.error("Error fetching clients: ", error);
      });




};

const displayComputers = (clientName2) => {
    const dbRef = ref(getDatabase(app));
  
    get(child(dbRef, "clients/"))
        .then((snapshot) => {
            const clientsData = snapshot.val();
            computerList.innerHTML = ""; // Clear the computer list
  
            for (const key in clientsData) {
                const clientName = clientsData[key].client;
            
                if(clientName == clientName2){
                // Check if the client has locations
                if (clientsData[key].locations) {
                    for (const locationKey in clientsData[key].locations) {
                        const location = clientsData[key].locations[locationKey];


                        
                        
                     
                        // Check if the location has computers
                        if (location.computers) {
                            const clientHeading = document.createElement("h5");
                        clientHeading.textContent = `Client: ${clientName}`;
                        computerList.appendChild(clientHeading);
                            for (const computerKey in location.computers) {
                                const computer = location.computers[computerKey];
                                computerName = computer.name;
  
                                const listItem = document.createElement("li");
                                const button = document.createElement("button");
                                button.textContent = `Location: ${location.name}, Computer: ${computerName}`;
                                //add an event listener for further functionality here if needed
                                button.addEventListener("click", () => {
                                    // document.getElementById("#deviceName").placeholder = "testing";
                                    window.location.href = "../../card.html";
                                    // addCompAtt(clientName, location.name, computerName);
                                })
                                // window.addEventListener("load", addCompAtt(clientName, location.name, computerName));
                                listItem.appendChild(button);
                                computerList.appendChild(listItem);
                            }
                        }
                    
                    }
                }}
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

const addCompAtt = (client, locationName, comp) => { // POTENTIAL SOLUTION TO TRANSFERRING INFORMATION TO DIFFERENT HTML?
    console.log(comp);
    const deviceName = document.getElementById("deviceName");
    if(deviceName){
      document.getElementById("deviceName").placeholder = "testing";
      location.reload();
    }else{
      console.log("DOES NOT EXIST!!!!");
    }
  }
  

const displayLocation = (clientName2) => {
    //currentClient = clientName2;
    const dbRef = ref(getDatabase(app));
    locationList.innerHTML = ""; //clear location list
  
    get(child(dbRef, "clients/"))
        .then((snapshot) => {
            const clientsData = snapshot.val();
           
  
            for (const key in clientsData) { //iterate through the clients
                const clientName = clientsData[key].client;
                
                if(clientName2 == clientName){ //if the client specified equals the client found
                // Check if the client has locations
                if (clientsData[key].locations) {

                    const clientHeading = document.createElement("h5"); //these 3 lines add the client name heading to the list of locations
                    clientHeading.textContent = `Client: ${clientName}`;
                    locationList.appendChild(clientHeading);

                    for (const locationKey in clientsData[key].locations) { //iterate through locations and create a list + buttons
                        const location = clientsData[key].locations[locationKey];

  
                                const listItem = document.createElement("li");
                                const button = document.createElement("button");
                                button.textContent = `Location: ${location.name}`;
                                //add an event listener for further functionality here if needed
                                button.addEventListener("click", () => {

                                displayComputers(clientName); //when a location is clicked display the devices. 
                                
                                })
                                listItem.appendChild(button);
                                locationList.appendChild(listItem);
                                
                    }
                }
            }}
        })
        .catch((error) => {
            console.error("Error fetching computers: ", error);
        });

};







const addClientButton = document.getElementById("addClientButton");
addClientButton.addEventListener('click', addClient);
const addComputerButton = document.getElementById("addComputerButton");
addComputerButton.addEventListener('click', addComputer);
const addLocationButton = document.getElementById("addLocationButton");
addLocationButton.addEventListener('click', addLocation);

//displayLocation();
displayClients();
//displayComputers();


