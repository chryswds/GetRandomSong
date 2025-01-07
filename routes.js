const express = require("express");
const routes = express();
const controllers = require("./controllers");

routes.get("/", controllers.mainPage);

routes.get("/artist", controllers.returnSearch);

routes.get("/image", controllers.returnImage);

routes.get("/album", controllers.returnAlbuns);

module.exports = routes;
