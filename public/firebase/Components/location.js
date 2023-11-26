import { app } from './firebase.js';
// import { logout } from './auth.js';
import { displayComputers } from './device.js';
import { getDatabase, ref, set, push, get, child } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

//once a client button is clicked function addLocation() give the option to add a Location to the client in the database
//------------------------------------------------------------------------------------------------------------------------------

const addLocationButton = document.getElementById("addLocationButton");

const locationList = document.getElementById("Location-List");
// const computerList = document.getElementById("comp-List");
let currentClient = "";
export const addLocation = (clientName, locationName) => {
    //const locationName = prompt("Enter the location name:");
    //if (!locationName) {
     // alert("Location name cannot be empty.");
     // return;
   // }
  
  const db = getDatabase(app);

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
            // alert(`Location "${locationName}" added for client "${clientName}"`);
            displayLocation(clientName);
            
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

export const displayLocation = (clientName2) => {
  //currentClient = clientName2;
  // const dbRef = getDatabase(app);
  const dbRef = ref(getDatabase());
  locationList.innerHTML = ""; //clear location list

  get(child(dbRef, `clients/`))
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
                      // console.log(location.name);


                              const listItem = document.createElement("li");
                              const button = document.createElement("button");
                              button.textContent = `Location: ${location.name}`;
                              //add an event listener for further functionality here if needed

                              const locationClick = (client) => {
                                return () => {
                                    const url = `../../devices.html?clientName=${client}&location=${location.name}`;
                                    window.location.href = url;
                                }
                              }

                            //   button.addEventListener("click", () => {
                            //   computerList.innerHTML = "";

                            //   displayComputers(clientName, location.name); //when a location is clicked display the devices. 
                            //   currLocation = location.name;

                            // })

                            button.addEventListener("click", locationClick(clientName));
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