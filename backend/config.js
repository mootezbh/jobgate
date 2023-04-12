const mongoose = require("mongoose");
require("dotenv").config();

// Connect MongoDB at default port 27017.
mongoose.connect(process.env.DB_URL, {}, (err) => {
  if (!err) {
    console.log("MongoDB Connection Succeeded.");
  } else {
    console.log("Error in DB connection: " + err);
  }
});

