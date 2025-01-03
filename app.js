const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(routes);

app.listen(3000, () => {
  console.log("running port 3000");
});
