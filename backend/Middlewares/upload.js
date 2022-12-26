const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./media/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const uploadFileMiddleware = multer({storage: storage});

module.exports = uploadFileMiddleware;
