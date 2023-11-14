import { app } from './firebase.js';
import { getDatabase, ref, set, push, get } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

//once a client button is clicked function addLocation() give the option to add a Location to the client in the database
//------------------------------------------------------------------------------------------------------------------------------
const locationList = document.getElementById("Location-List");

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

    const dbRef = ref(getDatabase(app));
 
    get(child(dbRef, "clients/"))
        .then((snapshot) => {
            const clientsData = snapshot.val();


            //const clientNameListValue = clientsData[key].client;


                  for (const key in clientsData) {


                    const clientNameListValue = clientsData[key].client;


                    if (clientNameListValue == clientNameIN)
                    {
                      const clientName = clientsData[key].client;
 
                      // Check if the client has locations
                      if (clientsData[key].locations) {
                        for (const locationKey in clientsData[key].locations) {
                        const locationData = clientsData[key].locations[locationKey];
  //--------------------------------------------------------------------------------------------------------------
                        //const locationData = snapshot.val();
                       


                        for (const key in locationData) {
                          const locationName = locationData[key].location;


                            const listItem = document.createElement("li");
                            const button = document.createElement("button");
                            //listItem.textContent = clientName;
                            button.textContent = locationName;
                            button.addEventListener("click", () => {
                            //window.location.href = "../../location.html"; //check for function that passes in some sort of path //instead go to location page
                            //displayLocation(locationName);
                            //alert("Clicked on client: " +clientName);
                            })
                            listItem.appendChild(button);
                            locationList.appendChild(listItem);
                        }


  //---------------------------------------------------------------------------------------------------------------
                     
                    }
                    locationList.innerHTML = "";
                }
            }
        }})
        .catch((error) => {
            console.error("Error fetching computers: ", error);
        });
};


const addLocationButton = document.getElementById("addLocationButton");
addLocationButton.addEventListener('click', addLocation);
