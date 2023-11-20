import { app } from './firebase.js';
import { getDatabase, ref, set, push, get, child } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

export const addComputer = () => {
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
    
    const cpu = prompt("Enter CPU:");
    const ram = prompt("Enter RAM:");
    const computerType = prompt("Enter Computer Type:");
    const model = prompt("Enter Model:");

    const db = getDatabase(app);
  
    const clientsRef = ref(db, 'clients');
  
    // Query the database to find the client's unique key based on their name
    get(clientsRef)
      .then((snapshot) => {
        const clientsData = snapshot.val();
        const clientKey = Object.keys(clientsData).find((key) => clientsData[key].client === clientName);
        const locationKey = Object.keys(clientsData[clientKey].locations).find(
            (key) => clientsData[clientKey].locations[key].name === locationName
        );
        if (clientKey) {
          // The client exists, add the computer under the existing client and location
  
          if (locationKey) {
            const locationComputersRef = ref(db, `clients/${clientKey}/locations/${locationKey}/computers`);
            const newComputerRef = push(locationComputersRef);
  
            // Set the computer data (you can add more properties if needed)
            set(newComputerRef, {
              name: computerName,
              cpu: cpu,
              ram: ram,
              computerType: computerType,
              model: model,
              // Other properties specific to the computer
              // POTENTIALLY ADD COMPUTER ATTRIBUTES HERE
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

export const getComputerDetails = (clientName, locationName, computerName) => {
  console.log("Parameters:", clientName, locationName, computerName);
  const db = getDatabase(app);
  const clientsRef = ref(db, 'clients');

  return get(child(clientsRef, '/'))
    .then((snapshot) => {
      const clientsData = snapshot.val();
      const clientKey = Object.keys(clientsData).find((key) => clientsData[key].client === clientName);

      console.log("Client Key:", clientKey);

      if (clientKey) {
        const clientLocationsRef = ref(db, `clients/${clientKey}/locations`);
        return get(clientLocationsRef)
          .then((locationsSnapshot) => {
            const locationsData = locationsSnapshot.val();
            const locationKey = Object.keys(locationsData).find((key) => locationsData[key].name === locationName);

            console.log("Location Key:", locationKey);

            if (locationKey) {
              const locationComputersRef = ref(db, `clients/${clientKey}/locations/${locationKey}/computers`);
              return get(locationComputersRef)
                .then((computersSnapshot) => {
                  const computersData = computersSnapshot.val();
                  const computerDetails = computersData ? computersData[computerName] : null;

                  console.log("Computer Details:", computerDetails);

                  if (computerDetails) {
                    return {
                      cpu: computerDetails.cpu || "",
                      ram: computerDetails.ram || "",
                      computerType: computerDetails.computerType || "",
                      model: computerDetails.model || "",
                    };
                  } else {
                    console.error("Computer details not found");
                    return null;
                  }
                })
                .catch((error) => {
                  console.error("Error fetching computer details: ", error);
                  return null;
                });
            } else {
              console.error(`Location "${locationName}" does not exist for client "${clientName}"`);
              return null;
            }
          })
          .catch((error) => {
            console.error("Error fetching locations: ", error);
            return null;
          });
      } else {
        console.error(`Client "${clientName}" does not exist`);
        return null;
      }
    })
    .catch((error) => {
      console.error("Error fetching clients: ", error);
      return null;
    });
};

