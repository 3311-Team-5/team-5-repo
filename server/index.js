const express = require('express'); // Web Server Framework
const path = require('path');
const { json } = require("body-parser"); // Parses request bodies before handling
const app = express();

const port = 3001;

app.use(json());
app.use(express.static(path.join(__dirname, '../public')))

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public', 'index.html'));
// })

app.listen(port, () => {
    console.log(`${port}, I READ YOU`);
  });