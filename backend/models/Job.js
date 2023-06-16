const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    expiationDate: {
      type: String,
    },
    contractType: {
      type: String,
      enum: ["CIVP"],
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Job", jobSchema);
