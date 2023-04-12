const express = require('express');
const config = require("./config.js");
require("dotenv").config();

const app = express()

const PORT = process.env.PORT || 5000;

app.listen(3000, () => {
    console.log(`Server is Listening on ${PORT}`)
})