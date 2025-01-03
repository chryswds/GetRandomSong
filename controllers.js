const path = require("path");
require("dotenv").config();

const mainPage = (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
};

const generateUserToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }),
  });
  const acT = await response.json();
  console.log(acT);
  return acT;
};
const userToken = async () => {
  try {
    const valid = await generateUserToken();
    const userTK = valid.access_token;
    console.log(userTK);
    return userTK;
  } catch (error) {
    console.log("error, ", error);
  }
};

const fetchSearchArtist = async (req, res) => {
  const { searchArtist } = req.query;

  const url = "https://api.spotify.com/v1/search?";
  const query = `q=${searchArtist}&type=artist&limit=1`;
  const queryUrl = url + query;

  const response = await fetch(queryUrl, {
    headers: {
      AUTHORIZATION: `Bearer ` + (await userToken()),
      "Content-Type": "application/json",
    },
  });
  const artist = await response.json();
  return artist;
};
const returnSearch = async (req, res) => {
  try {
    const search = await fetchSearchArtist();
    const searchName = search.artists.name;
    console.log(searchName);
    res.json(searchName);
  } catch (error) {
    console.log("error, ", error);
  }
};

const fetchArtist = async () => {
  const response = await fetch(
    `https://api.spotify.com/v1/artists/2xvtxDNInKDV4AvGmjw6d1`,
    {
      headers: {
        AUTHORIZATION: `Bearer ` + (await userToken()),
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

module.exports = {
  mainPage,
  userToken,
  returnName,
  returnImage,
  returnSearch,
  fetchSearchArtist
};
