const express = require("express");
let { userAccessToken } = require("./spotifyConfig");

const app = express();

app.use(express.json());

async function getArtists() {
  let data = await fetch(
    `https://api.spotify.com/v1/artists/2xvtxDNInKDV4AvGmjw6d1`,
    {
      headers: {
        AUTHORIZATION:
          `Bearer ` +
          "BQB3kYbMkXU3VF0AE7rqp7MMk2JxBnGbWOLBh9QI1e1-ZCm6VQ7xV1Fz7YeFhm8ynmchZ52IOnNxlnEh_JF9jdFSqwksybPyxkR579nx8KUXqVFO0cQ",
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
