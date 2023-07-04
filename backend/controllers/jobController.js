const jobModel = require("../models/Job");
const companyModel = require("../models/Company");
const categoryModel = require("../models/Category");
require("dotenv").config();
module.exports = {
  add: async (req, res) => {
    try {
      const jobData = req.body;
      const companyId = req.body.company;
      const newJob = new jobModel(jobData);
      const savedJob = await newJob.save();
      await companyModel.findByIdAndUpdate(companyId, {
        $push: {
          jobs: savedJob._id,
        },
      });
      await categoryModel.findByIdAndUpdate(savedJob.category, {
        $push: {
          jobs: savedJob._id,
        },
      });

      res.status(200).json({
        success: true,
        message: "Job created!",
        data: savedJob,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Failed to create job",
        error: error,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const jobs = await jobModel.find({});
      res.status(200).json({
        success: true,
        data: jobs,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        success: false,
        message: "Failed to get all jobs",
        error: error,
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const job = await jobModel.findById(req.params.id);
      res.status(200).json({ success: true, data: job });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ success: false, message: "Failed to get one job", error });
    }
  },
  update: async (req, res) => {
    try {
      const updatedJob = await jobModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({ success: true, data: updatedJob });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ success: false, message: "Failed to update job", error });
    }
  },
  delete: async (req, res) => {
    try {
      const deletedJob = await jobModel.findByIdAndDelete(req.params.id);
      await companyModel.findByIdAndUpdate(deletedJob.company, {
        $pull: {
          jobs: deletedJob._id,
        },
      });
      await categoryModel.findByIdAndUpdate(deletedJob.category, {
        $pull: {
          jobs: deletedJob._id,
        },
      });
      res.status(200).json({ success: true, data: deletedJob });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ success: false, message: "Failed to delete job", error });
    }
  },
  search: async (req, res) => {
    const { q } = req.query;
    try {
      const jobs = await jobModel.find({
        $or: [
          { title: { $regex: q ? q : /.*/, $options: "i" } },
          { description: { $regex: q ? q : /.*/, $options: "i" } },
        ],
      });
      res.status(200).json({ success: true, data: jobs });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ success: false, message: "Failed to search job", error });
    }
  },
};
