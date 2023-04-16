const { createCondidat } = require("../controllers/condidatController");
const upload = require("../middleware/upload");
const route = require("express").Router();

route.post("/create",upload.fields([{name:"fileCV"}, {name:"image"}]) ,createCondidat);

module.exports = route;