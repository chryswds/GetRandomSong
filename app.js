const express = require("express");
let { userAccessToken } = require("./spotifyConfig");

const app = express();

app.get("/", (req, res) => {
  async function getArtists() {
    let data = await fetch(
      `https://api.spotify.com/v1/artists/2xvtxDNInKDV4AvGmjw6d1`,
      {
        headers: {
          AUTHORIZATION: `Bearer ${userAccessToken}`,
        },
      }
    );
    return data;
  }

  res.json(getArtists());
});

app.listen(3000, () => {
  console.log("running port 3000");
});
