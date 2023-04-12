const condidatModel = require("../models/Condidat");

module.exports = {
  createCondidat: async (req, res) => {
    try {
      const newCondidat = new condidatModel({
        firstName: req.body.firstName,
      });
      console.log(req.body);
      await newCondidat.save(req.body, (err,item) => {
        if (err) {
            res.status(400).json({
                success: false,
                message: "failed to create condidat",
                err
              });

        } else {
            res.status(200).json({
                success: true,
                message: "Condidat created!",
              });
        }
      });
     
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "failed condidat",
      });
    }
  },
};
