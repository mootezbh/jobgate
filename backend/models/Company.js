const mongoose = require("mongoose");
const user = require("./User");

var companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
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
    isValidated: {
      type: Boolean,
      default: false,
    },
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    rating: {
      one: {
        type: Number,
        default: 0,
      },
      two: {
        type: Number,
        default: 0,
      },
      three: {
        type: Number,
        default: 0,
      },
      four: {
        type: Number,
        default: 0,
      },
      five: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

user.discriminator("Company", companySchema);
module.exports = mongoose.model("Company");
