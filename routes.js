const express = require("express");
const routes = express();
const controllers = require("./controllers");

routes.get("/", controllers.mainPage);

routes.post("/", controllers.userToken);

routes.get("/name", controllers.returnName);

routes.get("/image", controllers.returnImage);

module.exports = routes;
