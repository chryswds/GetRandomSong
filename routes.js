const express = require("express");
const routes = express();
const controllers = require("./controllers");

routes.get("/", controllers.mainPage);

routes.get("/artist", controllers.fetchSearchArtist);

routes.get("/test", (req, res) => {
  console.log("Query:", req.query);
  res.send("Check the server console for the query parameters.");
});

routes.get("/name", controllers.returnName);

routes.get("/image", controllers.returnImage);

module.exports = routes;
