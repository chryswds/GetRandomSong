const express = require("express");
const app = express();
require("dotenv").config();
const accessToken = process.env.ACCESS_TOKEN;
app.use(express.json());

const fetchName = async () => {
  const response = await fetch(
    `https://api.spotify.com/v1/artists/2xvtxDNInKDV4AvGmjw6d1`,
    {
      headers: {
        AUTHORIZATION: `Bearer ` + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  const jsonName = await response.json();
  return jsonName.name;
};

const fetchImage = async () => {
  const response = await fetch(
    `https://api.spotify.com/v1/artists/2xvtxDNInKDV4AvGmjw6d1`,
    {
      headers: {
        AUTHORIZATION: `Bearer ` + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  const jsonImage = await response.json();
  return jsonImage.images[0];
};

app.get("/", async (req, res) => {
  try {
    const profile = await fetchName();
    const image = await fetchImage();
    res.json(image);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("running port 3000");
});
