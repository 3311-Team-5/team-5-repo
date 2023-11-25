import { app } from './firebase.js';
import { getDatabase, ref, set, push, get, child, update } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

const computerList = document.getElementById("comp-List");

export const addComputer = (currentClient2, currLocation2, computerName2) => {
    const computerName = computerName2;
    
    const clientName = currentClient2;
    //prompt("Enter the client name:");
    //  if (!clientName) {
    //  alert("Client name cannot be empty.");
    //  return;
    //}

    const locationName = currLocation2;
    //prompt("Enter the location name:");
    //  if (!locationName) {
    //  alert("Location name cannot be empty.");
    //  return;
    //}
    
    //const cname = prompt("Enter Computer Name:");
    const computerType = prompt("Enter Laptop/Desktop:");
    const model = prompt("Enter Model:");
    const cpu = prompt("Enter CPU:");
    const ram = prompt("Enter RAM (in GB):");
    const storageType = prompt("Enter Storage Type:");
    const storageAmt = prompt("Enter Storage Amount (in GB):");
    const wKey = prompt("Enter Windows Key:");
    const oKey = prompt("Enter Office Key:");
    const username = prompt("Enter Username:");
    const notes = "";
    const history = "";

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
              storageType: storageType,
              storageAmt: storageAmt,
              windowsKey: wKey,
              officeKey: oKey,
              username: username,
              notes: notes,
              history: history,
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

export const displayComputers = (clientName2,locationName) => {
  // const dbRef = getDatabase(app);
  const dbRef = ref(getDatabase());
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
                      // console.log(location);

                      if(location.name == locationName){
                        // Check if the location has computers
                        if (location.computers) {
                          const clientHeading = document.createElement("h5");
                          clientHeading.textContent = `Client: ${clientName}`;
                          computerList.appendChild(clientHeading);
                            for (const computerKey in location.computers) {
                              const cKey = computerKey;
                              const computer = location.computers[computerKey];
                                const computerName = computer.name;

                                const listItem = document.createElement("li");
                                const button = document.createElement("button");
                                button.textContent = `Client: ${clientName}, Location: ${location.name}, Computer: ${computerName}`;
                                
                                // Use a function to capture the correct computerKey
                                const clickHandler = (computerKey) => {
                                    return () => {
                                        const url = `../../card.html?key=${key}&lkey=${locationKey}&ckey=${cKey}&client=${clientName}&location=${location.name}&computer=${computerName}`; // ADDED UNIQUE KEY AND LOCATION KEY TO URL
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
              }}
          }
      })
      .catch((error) => {
          console.error("Error fetching computers: ", error);
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
              storageType: computerDetails.storageType || "",
              storageAmt: computerDetails.storageAmt || "",
              windowsKey: computerDetails.windowsKey || "",
              officeKey: computerDetails.officeKey || "",
              username: computerDetails.username || "",
              notes: computerDetails.notes || "",
              history: computerDetails.history || "",
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

export const saveUpdate = (key, lkey, ckey, cpu, ram, computerType, model, storageType, storageAmt, windowsKey, officeKey, username, computerName, notes, history) => {
  const db = getDatabase(app);

  // Implement logic to update the database with the new values
  const updatedDetails = {
    cpu: cpu,
    ram: ram,
    computerType: computerType,
    model: model,
    storageType: storageType,
    storageAmt: storageAmt,
    windowsKey: windowsKey,
    officeKey: officeKey,
    username: username,
    computerName: computerName,
    notes: notes,
    history: history,
  };

  // Implement the function to update the database with the new values
  // For now, logs the updated details
  console.log("Updated Details:", updatedDetails);

  const newKey = ref(db, `clients/${key}/locations/${lkey}/computers/${ckey}`);

  update(newKey, updatedDetails);
};