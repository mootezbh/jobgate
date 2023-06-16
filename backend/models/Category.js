const mongoose = require("mongoose"); 

// Declare the Schema of the Mongo model
var CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  Jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

//Export the model
module.exports = mongoose.model("Category", CategorySchema);
