const express = require("express");
const config = require("./config.js");
const condidatRouter = require("./routes/condidatRouter");
const verifyRouter = require("./routes/verifyRouter");
const companyRouter = require("./routes/companyRouter");
require("dotenv").config();

const app = express();
app.use(express.static("./views"));
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/condidat", condidatRouter);
app.use("/company", companyRouter);
app.use("/verify", verifyRouter);

app.listen(3000, () => {
  console.log(`Server is Listening on ${PORT}`);
});

//FIXME: fix email template
//HACK: test requests
//TODO: finish controllers and routes
