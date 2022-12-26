var express = require("express");
var router = express.Router();
const { StatusCodes } = require("http-status-codes");
const { login } = require("../../Controllers/Auth.contoller");

router.post('/login', 
  login
)

module.exports = router;
