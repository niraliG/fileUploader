var express = require("express");
const { getFiles, uploadFile } = require("../../Controllers/files.controller");
var router = express.Router();
const googleAuthorization = require("../../Middlewares/googleAuthorization");
const uploadFileMiddleware = require("../../Middlewares/upload");

router.get("/", googleAuthorization, getFiles);
router.post(
  "/upload",
  googleAuthorization,
  uploadFileMiddleware.single("file"),
  uploadFile
);
module.exports = router;
