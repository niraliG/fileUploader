const express = require("express");
require("dotenv").config();
const { handleError } = require("./Helpers/errorHandler");
const indexRouter = require("./Routes");
const http = require('http');
const app = express();
const cors = require('cors')
const port = process.env.PORT || '3001';
app.set('port', port);
const server = http.createServer(app);


app.use(cors());
app.use(express.json());
app.use("/media/uploads", express.static('media/uploads'));
app.use((err, req, res, next) => handleError(err, res));
app.use("/", indexRouter);


server.listen(port, () => {
    console.log(`Server running at ${port}`);
  });