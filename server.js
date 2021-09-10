const express = require('express');
const PORT = process.env.PORT || 3001; //Set the port to use the the environment variable

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();

// Middleware to tell the server to turn these files into static resources so we don't need specific endpoints to access them. This lets us access all our front end code
app.use(express.static('public'));

// Parse incoming JSON data
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});