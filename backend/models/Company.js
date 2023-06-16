const mongoose = require('mongoose');
const user = require("./User");

var companySchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
        unique:true,
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
        type: Boolean,
        default: false
    },
    jobs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
    }]
});

user.discriminator("Company",companySchema);
module.exports = mongoose.model('Company');