const mongoose = require('mongoose'); // Erase if already required
const user = require("./User");

var companySchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
        required:true,
    },
    isValidated:{
        type: Boolean
    }
});

user.discriminator("Company",companySchema);
module.exports = mongoose.model('Company');