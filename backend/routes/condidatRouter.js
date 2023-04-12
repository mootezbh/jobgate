const { createCondidat } = require("../controllers/condidatController");

const route = require("express").Router();

route.post("/create", createCondidat);

module.exports = route;