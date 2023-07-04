const categoryModel = require("../models/Category");

module.exports = {
  add: async (req, res) => {
    try {
      const categoryData = req.body;
      const newCategory = new categoryModel(categoryData);
      const savedCategory = await newCategory.save();
      res.status(200).json({
        success: true,
        message: "Category created!",
        data: savedCategory,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Failed to create category",
        error: error,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const categories = await categoryModel.find({});
      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        success: false,
        message: "Failed to get all categories",
        error: error,
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const category = await categoryModel.findById(req.params.id);
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Failed to get one category",
        error: error,
      });
    }
  },
  update: async (req, res) => {
    try {
      const updatedCategory = await categoryModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({ success: true, data: updatedCategory });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ success: false, message: "Failed to update category", error });
    }
  },
  delete: async (req, res) => {
    try {
      const deletedCategory = await categoryModel.findByIdAndDelete(
        req.params.id
      );
      res.status(200).json({ success: true, data: deletedCategory });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ success: false, message: "Failed to delete category", error });
    }
  },

  search: async (req, res) => {
    const { q } = req.query;
    try {
      const categories = await categoryModel.find({
        $or: [
          { name: { $regex: q ? q : /.*/, $options: "i" } },
          { description: { $regex: q ? q : /.*/, $options: "i" } },
        ],
      });
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ success: false, message: "Failed to search category", error });
    }
  },
};
