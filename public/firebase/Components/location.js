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