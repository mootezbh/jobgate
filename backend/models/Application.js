const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var applicationSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Application", applicationSchema);
