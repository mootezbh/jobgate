const companyModel = require("../models/Company");
const bcrypt = require("bcrypt");
const { randomBytes } = require("crypto");
const sendEmail = require("./nodemailer");
module.exports = {
    add: async (req, res) => {
        try {
            hashedPwd = bcrypt.hashSync(req.body.password, 10);
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
                        error: err
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: "Company created!",
                    });
                    sendEmail(item.verif_code, item.email, item.newCompany);
                }
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                message: "failed to create company",
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
            hashedPwd = bcrypt.hashSync(req.body.password, 10);
            req.body.password = hashedPwd;
            const company = await companyModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
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
            });
        }
    },
    search: async (req, res) => {
        const {q} = req.query;
        try {
            const companies = await companyModel.find({
                $or: [
                    {companyName: { $regex: q ? q : /.*/, $options: "i" }},
                    {description: { $regex: q ? q : /.*/, $options: "i" }},
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
    getOffers: async (req, res) => {
        
    }
}