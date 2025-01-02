const express = require("express");
const routes = require("./routes");
const { userToken } = require("./controllers");

const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();


app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(routes);

userToken();

app.listen(3000, () => {
  console.log("running port 3000");
});
