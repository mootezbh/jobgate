const mongoose = require('mongoose'); // Erase if already required
const options = { discriminatorKey: "itemtype" };
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},
{timestamps: true},
options
);

//Export the model
module.exports = mongoose.model('User', userSchema);