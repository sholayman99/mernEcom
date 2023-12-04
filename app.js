const express = require("express");
const app = new express();
const path = require("path");
//importing router
const router = require("./src/Routes/api");

//importing database
const mongoose = require("mongoose");

//importing security middlewares

require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  standardHeaders: "draft-7",
  legacyHeaders: false,
  
});

//implementation of security middlewares.

app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(limiter);
app.use(express.json());
app.use(cookieParser());

//implementation of routes
app.use("/api/v1", router);

app.use(express.static("client/dist"));

//implementation if undefined route
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
});

//MongoDB database connection

async function connectToMongoDB() {
  try {
    const uri = "mongodb+srv://mern444:mern444@cluster0.dfbtq6i.mongodb.net/";
    const OPTIONS = { user: "mern444", pass: "mern444" };
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    // Perform database operations here
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the async function to connect to MongoDB
connectToMongoDB();

module.exports = app;