const e = require('express');
const { verifyToken } = require('../Models/auth.model');

async function login(req, res) {
  try {
    const token = req.body.token;
    const verify = await verifyToken(token);
    if(verify)
      res.status(200).send({ message: 'Login successful' });
    else
    res.status(500).send({ message: 'Error while logging in' });
  } catch (error) {
    res.status(401).send({ message: 'Invalid token' });
  }
}

module.exports = {
  login,
};