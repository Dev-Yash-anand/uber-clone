require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = app;