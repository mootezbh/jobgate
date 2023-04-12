const mongoose = require('mongoose'); // Erase if already required
const user = require("./User");

var adminSchema = new mongoose.Schema({
    
});

user.discriminator("Admin",adminSchema);
module.exports = mongoose.model('Admin');