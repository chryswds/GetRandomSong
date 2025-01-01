const path = require("path");
require("dotenv").config();
const accessToken = process.env.ACCESS_TOKEN;

const mainPage = (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
};

const generateUserToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "ec597fbf6a2044f3b9db050f5f9c5bd2",
      client_secret: "032486bee42948e7af9badc58974697b",
    }),
  });
  const acT = await response.json();
  return acT;
};
const userToken = async () => {
  try {
    const valid = await generateUserToken();
    const userTK = valid.access_token;
    return userTK;
  } catch (error) {
    console.log("error, ", error);
  }
};

const fetchArtist = async () => {
  const response = await fetch(
    `https://api.spotify.com/v1/artists/2xvtxDNInKDV4AvGmjw6d1`,
    {
      headers: {
        AUTHORIZATION: `Bearer ` + userToken(),
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

module.exports = { mainPage, userToken, returnName, returnImage };
