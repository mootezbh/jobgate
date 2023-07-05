const express = require("express");
const testController = require("../controllers/testController");
const route = require("express").Router();

route.get("/create", testController.add);
route.get("/getAll", testController.getAll);
route.get("/getOne/:id", testController.getOne);
route.put("/update/:id", testController.update);
route.delete("/delete/:id", testController.delete);

module.exports = route;
