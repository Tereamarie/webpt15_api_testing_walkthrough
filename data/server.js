const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev")); // "tiny"

server.use("/", (req, res) => {
  res.json({ api: "Up and running..." });
});

module.exports = server;
