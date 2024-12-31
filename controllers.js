const path = require("path");
require("dotenv").config();
const accessToken = process.env.ACCESS_TOKEN;

const mainPage = (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
};

const fetchArtist = async () => {
  const response = await fetch(
    `https://api.spotify.com/v1/artists/2xvtxDNInKDV4AvGmjw6d1`,
    {
      headers: {
        AUTHORIZATION: `Bearer ` + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  const artist = await response.json();
  return artist;
};

const returnName = async (req, res) => {
  try {
    const artist = await fetchArtist();
    const name = artist.name;
    res.json(name);
  } catch (error) {
    console.log("error, ", error);
  }
};
const returnImage = async (req, res) => {
  try {
    const artist = await fetchArtist();
    const image = artist.images[1].url;
    res.send("<img src = " + image + ">");
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { mainPage, returnName, returnImage };
