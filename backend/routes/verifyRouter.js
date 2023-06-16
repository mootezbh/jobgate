const User = require("../models/User");
const { join } = require("path");
const route = require("express").Router();
route.post("/:token", async (req, res) => {
  try {
    const user = await User.findOne({ verif_code: req.params.token });
    user.isVerified = true;
    user.verif_code = undefined;
    user.save();
    res.sendFile(join(__dirname, "../views/success.html"));
  } catch (error) {
    res.sendFile(join(__dirname, "../views/fail.html"));
  }
});

module.exports = route;
