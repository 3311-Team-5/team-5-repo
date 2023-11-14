import { app } from './firebase.js';
import { getDatabase, ref, set, push, get } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

//once a client button is clicked function addLocation() give the option to add a Location to the client in the database
//------------------------------------------------------------------------------------------------------------------------------


export const addLocation = (clientName) => {
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


  export const  displayLocation = (clientNameIN) =>  {
    //the beginning of this function reaches location, just like the device display function does

    const dbRef = ref(getDatabase(app));
 
    get(child(dbRef, "clients/"))
        .then((snapshot) => { 
            const clientsData = snapshot.val(); 

          

                  for (const key in clientsData) {

                    const clientName = clientsData[key].client;
                    const locationList = document.getElementById("Location-List");

                    locationList.innerHTML = "";
                    //here the code started to differ, as we are only interested in the locations for one client
                    if (clientName == clientNameIN) //this condiitional should check for the client
                    { 
                    
 
                      // Check if the client has locations, this is the same as the device display function
                      if (clientsData[key].locations) {
                        for (const locationKey in clientsData[key].locations) {
                            const location = clientsData[key].locations[locationKey];
                        
                            const locationName = location.location;

                            const listItem = document.createElement("li");
                            const button = document.createElement("button");
                            //listItem.textContent = clientName;
                            button.textContent = locationName;
                            button.addEventListener("click", () => {

                            //here is the code that should execute when you click a location button

                            })
                            listItem.appendChild(button);
                            locationList.appendChild(listItem);
                     
                    }
                    
                }
            }
        }})
        .catch((error) => {
            console.error("Error fetching computers: ", error);
        });
};


const addLocationButton = document.getElementById("addLocationButton");
addLocationButton.addEventListener('click', addLocation);
