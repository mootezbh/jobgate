const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype == "application/pdf") {
      cb(null, "uploads/pdf");
    }
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("error"), false);
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: filefilter,
});
