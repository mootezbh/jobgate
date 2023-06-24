const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var applicationSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    candidat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Condidat",
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Application", applicationSchema);
