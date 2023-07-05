const testModel = require("../models/Test");
const jobModel = require("../models/Job");
module.exports = {
  add: async (req, res) => {
    try {
      const test = new testModel(req.body);
      const savedTest = await test.save();
      await jobModel.findByIdAndUpdate(req.body.job, {
        test: savedTest._id,
      });
      res.status(200).json({
        success: true,
        message: "Test created!",
        data: savedTest,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Failed to create test",
        error: error,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const tests = await testModel.find({});
      res.status(200).json({
        success: true,
        data: tests,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Failed to get all tests",
        error: error,
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const test = await testModel.findById(req.params.id);
      res.status(200).json({
        success: true,
        data: test,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Failed to get one test",
        error: error,
      });
    }
  },
  update: async (req, res) => {
    try {
      const test = await testModel.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({
        success: true,
        data: test,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const test = await testModel.findByIdAndDelete(req.params.id);
      await jobModel.findByIdAndUpdate(req.body.job, {
        test: null,
      });
      res.status(200).json({
        success: true,
        data: test,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
      });
    }
  },
};
