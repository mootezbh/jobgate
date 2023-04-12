const express = require('express');
const config = require("./config.js");
const condidatRouter = require("./routes/condidatRouter");
require("dotenv").config();

const app = express()

const PORT = process.env.PORT || 5000;


app.use("/condidat", condidatRouter);

app.listen(3000, () => {
    console.log(`Server is Listening on ${PORT}`)
})