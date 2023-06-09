const condidatModel = require("../models/Condidat");
const bcrypt = require("bcrypt");
const { randomBytes } = require("crypto");
const sendEmail = require("./nodemailer");
require("dotenv").config();
module.exports = {
  add: async (req, res) => {
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
            error: err,
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Condidat created!",
            data: item,
          });
          sendEmail(item.verif_code, item.email, item.firstName);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "failed condidat",
        error: error,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const condidats = await condidatModel.find({});
      res.status(200).json({
        success: true,
        data: condidats,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "failed to get all condidat",
        error: error,
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const condidat = await condidatModel.findById(req.params.id);
      res.status(200).json({
        success: true,
        data: condidat,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "failed to get one condidat",
        error: error,
      });
    }
  },
  update: async (req, res) => {
    try {
      if (req.files.fileCV) {
        req.body["CV"] = req.files.fileCV[0].filename;
      }
      if (req.files.image) {
        req.body["picture"] = req.files.image[0].filename;
      }
      if (req.body.password) {
        hashedPwd = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPwd;
      }

      const condidat = await condidatModel.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },

        { new: true }
      );
      res.status(200).json({
        success: true,
        data: condidat,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "failed to update condidat",
        error: error,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const condidat = await condidatModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        data: condidat,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "failed to delete condidat",
        error: error,
      });
    }
  },
  search: async (req, res) => {
    const { q } = req.query;
    try {
      const condidats = await condidatModel.find({
        $or: [
          { firstName: { $regex: q ? q : /.*/, $options: "i" } },
          {
            lastName: {
              $regex: q ? q : /.*/,
              $options: "i",
            },
          },
        ],
      });

      res.status(200).json({
        success: true,
        data: condidats,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "failed to get condidat",
        error: error,
      });
    }
  },
};
