import { app } from './firebase.js';
import { getDatabase, ref, set, push, get, child, update } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

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
  return new Promise(async (resolve, reject) => {
    console.log("Parameters:", clientName, locationName, computerName);
    const db = getDatabase(app);
    const clientsRef = ref(db, 'clients');

    try {
      const snapshot = await get(child(clientsRef, '/'));
      const clientsData = snapshot.val();
      const clientKey = Object.keys(clientsData).find((key) => clientsData[key].client === clientName);

      console.log("Client Key:", clientKey);

      if (clientKey) {
        const clientLocationsRef = ref(db, `clients/${clientKey}/locations`);
        const locationsSnapshot = await get(clientLocationsRef);
        const locationsData = locationsSnapshot.val();
        const locationKey = Object.keys(locationsData).find((key) => locationsData[key].name === locationName);

        console.log("Location Key:", locationKey);

        if (locationKey) {
          const locationComputersRef = ref(db, `clients/${clientKey}/locations/${locationKey}/computers`);
          const computersSnapshot = await get(locationComputersRef);
          const computersData = computersSnapshot.val();

          console.log("ComputerData:", computersData);

          // Find the key based on computerName
          const computerKey = Object.keys(computersData).find((key) => computersData[key].name === computerName);

          console.log("Computer Key:", computerKey);

          // Use the computerKey to access the specific computer details
          const computerDetails = computerKey ? computersData[computerKey] : null;

          console.log("Computer Details:", computerDetails);

          if (computerDetails) {
            resolve({
              cpu: computerDetails.cpu || "",
              ram: computerDetails.ram || "",
              computerType: computerDetails.computerType || "",
              model: computerDetails.model || "",
            });
          } else {
            console.error("Computer details not found");
            resolve(null);
          }
        } else {
          console.error(`Location "${locationName}" does not exist for client "${clientName}"`);
          resolve(null);
        }
      } else {
        console.error(`Client "${clientName}" does not exist`);
        resolve(null);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      reject(error);
    }
  });
};

export const saveUpdate = (key, lkey, ckey, cpu, ram, computerType, model) => {
  const db = getDatabase(app);

  // Implement logic to update the database with the new values
  const updatedDetails = {
    cpu: cpu,
    ram: ram,
    computerType: computerType,
    model: model,
  };

  // Implement the function to update the database with the new values
  // For now, logs the updated details
  console.log("Updated Details:", updatedDetails);

  const newKey = ref(db, `clients/${key}/locations/${lkey}/computers/${ckey}`);

  update(newKey, updatedDetails);
};