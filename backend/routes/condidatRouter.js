const condidatController = require("../controllers/condidatController");
const upload = require("../middleware/upload");
const route = require("express").Router();

route.post("/create",upload.fields([{name:"fileCV"}, {name:"image"}]) ,condidatController.add);
route.get("/getAll",condidatController.getAll);
route.get("/getOne/:id",condidatController.getOne);
route.put("/update/:id",upload.fields([{name:"fileCV"}, {name:"image"}]) ,condidatController.update);
route.delete("/delete/:id",condidatController.delete);
route.get("/search",condidatController.search);

module.exports = route;