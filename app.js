const express = require("express");

const app = express();
require("dotenv").config();
const accessToken = process.env.ACCESS_TOKEN;

app.use(express.json());

async function getArtists() {
  let data = await fetch(
    `https://api.spotify.com/v1/artists/2xvtxDNInKDV4AvGmjw6d1`,
    {
      headers: {
        AUTHORIZATION: `Bearer ` + accessToken,
      },
    }
  );
  const actualData = await data.json();
  return actualData;
}

async function getAlbum() {
  let data = await fetch(
    `https://api.spotify.com/v1/albums/4n1tg05JN5EY0k7FRRcAir`,
    {
      headers: {
        AUTHORIZATION: `Bearer ` + accessToken,
      },
    }
  );
  const response = await data.json();
  return response;
}

app.get("/", async (req, res) => {
  try {
    const profile = await getArtists();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("running port 3000");
});
