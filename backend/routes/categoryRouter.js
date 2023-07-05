const express = require("express");
const categoryController = require("../controllers/categoryController");
const route = require("express").Router();

route.post("/create", categoryController.add);
route.get("/getAll", categoryController.getAll);
route.get("/getOne/:id", categoryController.getOne);
route.put("/update/:id", categoryController.update);
route.delete("/delete/:id", categoryController.delete);

module.exports = route;