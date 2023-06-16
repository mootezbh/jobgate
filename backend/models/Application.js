const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var applicationSchema = new mongoose.Schema({
    
}, { timestamps: true });

//Export the model
module.exports = mongoose.model("Application", applicationSchema);
