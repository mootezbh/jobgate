const express = require("express");
const applicationController = require("../controllers/applicationController");
const route = require("express").Router();

route.post("/create", applicationController.add);
route.get("/getAll", applicationController.getAll);
route.get("/getOne/:id", applicationController.getOne);
route.put("/update/:id", applicationController.update);
route.delete("/delete/:id", applicationController.delete);

module.exports = route;
