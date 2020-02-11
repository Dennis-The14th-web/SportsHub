// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
// const cors = require('cors');  // we don't need it anymore, because we use proxy server instead

// DB Setup (connect mongoose and instance of mongodb)


if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }
// DB Setup (connect mongoose and instance of mongodb)
mongoose.connect(process.env.MONGODB_URI || "mongodb://dennis_the14th:gracie1@ds163480.mlab.com:63480/heroku_v53xql53");

// App Setup (morgan and body-parser are middleware in Express)
app.use(morgan('combined'));  // middleware for logging
app.use(bodyParser.json({ type: '*/*' }));  // middleware for helping parse incoming HTTP requests
// app.use(cors());  // middleware for circumventing (规避) cors error

// Router Setup
router(app);

// Server Setup
const port = process.env.PORT || 3080;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);