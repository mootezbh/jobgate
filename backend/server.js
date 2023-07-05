const express = require("express");
const config = require("./config.js");
const condidatRouter = require("./routes/condidatRouter");
const verifyRouter = require("./routes/verifyRouter");
const companyRouter = require("./routes/companyRouter");
const jobRouter = require("./routes/jobRouter");
const testRouter = require("./routes/testRouter");
const applicationRouter = require("./routes/applicationRouter");
const categoryRouter = require("./routes/categoryRouter");
require("dotenv").config();

const app = express();
app.use(express.static("./views"));
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/condidat", condidatRouter);
app.use("/company", companyRouter);
app.use("/job", jobRouter);
app.use("/verify", verifyRouter);
app.use("/test", testRouter);
app.use("/application", applicationRouter);
app.use("/category", categoryRouter);

app.listen(3000, () => {
  console.log(`Server is Listening on ${PORT}`);
});

//TODO: test requests
//condidat done

//TODO: login/logout ===> jwt

//TODO:add company logo
