const mongoose = require("mongoose");

var testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      choices: [
        {
          text: {
            type: String,
            required: true,
          },
          value: {
            type: String,
            required: true,
          },
        },
      ],
      answer: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Test", testSchema);
