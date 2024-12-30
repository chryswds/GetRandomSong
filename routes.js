const express = require("express");
const routes = express();
const controllers = require("./controllers");

routes.get("/", controllers.returnName);

module.exports = routes;
