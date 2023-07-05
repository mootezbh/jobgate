//create router like i condidat router
const express = require("express");

const companyController = require("../controllers/companyController");

const route = require("express").Router();

route.get("/create", companyController.add);
route.get("/getAll", companyController.getAll);
route.get("/getOne/:id", companyController.getOne);
route.put("/update/:id", companyController.update);
route.delete("/delete/:id", companyController.delete);
route.get("/search", companyController.search);

module.exports = route;
