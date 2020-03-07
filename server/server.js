// node modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// imported modules


// initiate express module
const app = express();

// middleware used by express
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET - fetch data from server
app.get("/", (req, res) => {
    res.json("Hello amazon clone");
});

// POST - send data to server
app.post("/", (req, res) => {
    console.log(req.body.name);
});
// START - server on localhost port:3000
app.listen(3000, err => {
    if (err) {
        console.log(err);
    } else {
        console.log("server is listening on port 3000");
    }
});
