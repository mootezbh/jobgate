const companyModel = require("../models/Company");
const bcrypt = require("bcrypt");
const { randomBytes } = require("crypto");
const sendEmail = require("./nodemailer");
require("dotenv").config();
module.exports = {
  add: async (req, res) => {
    try {
      if (req.files) {
        req.body["picture"] = req.files.image[0].filename;
      }
      hashedPwd = bcrypt.hashSync(req.body.password, process.env.PASSWORD_SALT);
      const newCompany = new companyModel({
        ...req.body,
        password: hashedPwd,
        verif_code: randomBytes(6).toString("hex"),
      });
      await newCompany.save(req.body, (err, item) => {
        if (err) {
          res.status(400).json({
            success: false,
            message: "error creating company",
            error: err,
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Company created!",
            data: item,
          });
          sendEmail(item.verif_code, item.email, item.companyName);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "failed to create company",
        error: error,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const companies = await companyModel.find({});
      res.status(200).json({
        success: true,
        data: companies,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "failed to get all company",
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const company = await companyModel.findById(req.params.id);
      res.status(200).json({
        success: true,
        data: company,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "failed to get one company",
      });
    }
  },
  update: async (req, res) => {
    try {
      if (req.body.password) {
        var hashedPwd = bcrypt.hashSync(
          req.body.password,
          process.env.PASSWORD_SALT
        );
        req.body.password = hashedPwd;
      }

      const company = await companyModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.status(200).json({
        success: true,
        data: company,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "failed to update company",
        error: error,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const company = await companyModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        data: company,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "failed to delete company",
        error: error,
      });
    }
  },
  search: async (req, res) => {
    const { q } = req.query;
    try {
      const companies = await companyModel.find({
        $or: [
          { companyName: { $regex: q ? q : /.*/, $options: "i" } },
          { description: { $regex: q ? q : /.*/, $options: "i" } },
        ],
      });
      res.status(200).json({
        success: true,
        data: companies,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "failed to search company",
      });
    }
  },
};
