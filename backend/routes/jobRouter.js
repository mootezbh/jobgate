const express = require("express");
const jobController = require("../controllers/jobController");
const route = require("express").Router();

route.post("/create", jobController.add);
route.get("/getAll", jobController.getAll);
route.get("/getOne/:id", jobController.getOne);
route.put("/update/:id", jobController.update);
route.delete("/delete/:id", jobController.delete);
route.get("/search", jobController.search);

module.exports = route;
