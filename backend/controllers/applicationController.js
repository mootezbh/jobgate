const condidatModel = require("../models/condidat");
const jobModel = require("../models/job");
const applicationModel = require("../models/application");
module.exports = {
  //add an application
  add: async (req, res) => {
    try {
      const applicationData = req.body;
      const newApplication = new applicationModel(applicationData);
      const savedApplication = await newApplication.save();
      await jobModel.findByIdAndUpdate(req.body.job, {
        $push: {
          applications: savedApplication._id,
        },
      });
      await condidatModel.findByIdAndUpdate(req.body.condidatId, {
        $push: {
          applications: savedApplication._id,
        },
      });
      res.status(200).json({
        success: true,
        message: "Application created!",
        data: savedApplication,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Failed to create application",
        error: error,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const applications = await applicationModel.find({});
      res.status(200).json({
        success: true,
        data: applications,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        success: false,
        message: "Failed to get all applications",
        error: error,
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const application = await applicationModel.findById(req.params.id);
      res.status(200).json({
        success: true,
        data: application,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Failed to get one application",
        error: error,
      });
    }
  },
  update: async (req, res) => {
    try {
      const updatedApplication = await applicationModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({ success: true, data: updatedApplication });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        success: false,
        message: "Failed to update application",
        error,
      });
    }
  },
  delete: async (req, res) => {
    try {
      deletedApplication = await applicationModel.findByIdAndDelete(
        req.params.id
      );
      await jobModel.findByIdAndUpdate(deletedApplication.jobId, {
        $pull: {
          applications: deletedApplication._id,
        },
      });
      await condidatModel.findByIdAndUpdate(deletedApplication.condidatId, {
        $pull: {
          applications: deletedApplication._id,
        },
      });
      res.status(200).json({
        success: true,
        message: "Application deleted!",
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        success: false,
        message: "Failed to delete application",
        error: error,
      });
    }
  },
};
