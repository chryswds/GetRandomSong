const express = require("express");
const routes = express();
const controllers = require("./controllers");

routes.get("/", controllers.mainPage);

routes.get("/artist", controllers.searchArtistName);

routes.get("/image", controllers.returnImage);

module.exports = routes;
