const mongoose = require("mongoose");
const options = { discriminatorKey: "itemtype" };

var userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verif_code: {
      type: String,
    },
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatMessage",
      },
    ],
  },
  { timestamps: true },
  options
);

//Export the model
module.exports = mongoose.model("User", userSchema);
