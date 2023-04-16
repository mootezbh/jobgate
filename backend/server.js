const express = require("express");
const config = require("./config.js");
const condidatRouter = require("./routes/condidatRouter");
const verifyRouter = require("./routes/verifyRouter");
require("dotenv").config();

const app = express();
app.use(express.static("./views"));
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/condidat", condidatRouter);
app.use("/verify", verifyRouter);

app.listen(3000, () => {
  console.log(`Server is Listening on ${PORT}`);
});
