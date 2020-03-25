// node modules
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// imported modules
const connectDB = require("./src/config/db");
const productRoutes = require("./src/routes/product");
const categoryRoutes = require("./src/routes/category");
const ownerRoutes = require("./src/routes/owner");

dotenv.config();

// initiate express module
const app = express();

// middleware used by express
// set cors headers
app.use(cors());
// set logger
app.use(morgan("dev"));
// parse body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/admin/assets'));
// Connect Database
connectDB();
// ROUTES
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ownerRoutes);

// START - server on localhost port:3000
app.listen(process.env.PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is listening on port 3000");
  }
});
