const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const AnimalRouter = require("../routes/animals-router");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev")); // "tiny"

server.use("/animals", AnimalRouter);

server.use("/", (req, res) => {
  res.json({ api: "Up and running..." });
});

server.use("/", (error, req, res, next) => {
  console.log(error);
  res.status(500).json({ message: "Something broke" });
});

module.exports = server;
