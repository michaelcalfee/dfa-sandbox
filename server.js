//Install express server
const express = require('express');
const app = express();
const path = require('path');

// output folder
app.use(express.static(path.join(__dirname, 'static/html')));
app.use(express.static(path.join(__dirname, 'static')));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);