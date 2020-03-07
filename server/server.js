// node modules
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// imported modules
const User = require('./models/user');
// local variables

// iniate dotenv
dotenv.config();

// initiate express module
const app = express();

// initate mongoDB
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to database");
        }
    });

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
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    );
    user.save((err) => {
        if (err) {
            res.json(err);
        } else {
            res.json("success new user saved");
        }
    });
});
// START - server on localhost port:3000
app.listen(process.env.PORT, err => {
    if (err) {
        console.log(err);
    } else {
        console.log("server is listening on port 3000");
    }
});
