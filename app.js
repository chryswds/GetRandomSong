const express = require("express");
const routes = require("./routes");
const { userToken } = require("./controllers");
const app = express();
app.use(express.json());
app.use(routes);

userToken();

app.listen(3000, () => {
  console.log("running port 3000");
});
