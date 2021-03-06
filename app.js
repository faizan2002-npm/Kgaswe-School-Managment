const express = require("express");
const joi = require("joi");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Cookie Parser

app.use(cookieParser());

//sessions

app.use(
  session({
    secret: "secret",
    resave: true,
    saveinitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);


app.use("/assets", express.static("assets"));
app.use(express.static(__dirname + "/views"));

//MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/Kgaswe", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database has connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`);
});
