const authRoutes = require('./auth');
const fileRoutes = require("./files")
const express = require('express');
const app = express();

app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
module.exports = app;