require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const connectToDb = require('./db/db');
const userRoute = require('./routes/user.route');
const captainRoute = require('./routes/captain.route');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/users", userRoute);
app.use("/captains", captainRoute);

module.exports = app;