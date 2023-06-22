const mongoose = require("mongoose"); // Erase if already required
const user = require("./User");

var condidatSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  CV: {
    type: String,
  },
  picture: {
    type: String,
  },
  level: {
    type: String,
  },
  recommender: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Condidat",
    },
  ],
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
});

user.discriminator("Condidat", condidatSchema);
module.exports = mongoose.model("Condidat");
