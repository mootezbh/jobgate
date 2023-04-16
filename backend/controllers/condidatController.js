const condidatModel = require("../models/Condidat");
const bcrypt = require("bcrypt");
const { randomBytes } = require("crypto");
const sendEmail = require("./nodemailer");
module.exports = {
  createCondidat: async (req, res) => {
    if (req.files) {
      req.body["CV"] = req.files.fileCV[0].filename;
      req.body["picture"] = req.files.image[0].filename;
    }
    try {
      hashedPwd = bcrypt.hashSync(req.body.password, 10);
      const newCondidat = new condidatModel({
        ...req.body,
        password: hashedPwd,
        verif_code: randomBytes(6).toString("hex"),
      });
      await newCondidat.save(req.body, (err, item) => {
        if (err) {
          res.status(400).json({
            success: false,
            message: "error creating condidat",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Condidat created!",
          });
          sendEmail(item.verif_code, item.email, item.firstName);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "failed condidat",
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const data = condidatModel.find();
    } catch (error) {}
  },
};
