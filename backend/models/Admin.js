const mongoose = require('mongoose'); 
const user = require("./User");

var adminSchema = new mongoose.Schema({
    
});

user.discriminator("Admin",adminSchema);
module.exports = mongoose.model('Admin');