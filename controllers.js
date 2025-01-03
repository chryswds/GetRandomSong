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

const searchArtistName = async (req, res) => {
  const searchValue = req.query.searchValue;

  if (!searchValue) {
    return res.status(400).send("No search value");
  }

  try {
    const token = await userToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchValue
      )}&type=artist&limit=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `Spotify API Error: ${response.statusText} (${response.status})`
      );
    }
    const data = await response.json();
    const dataItems = data.artists.items;
    for (const name of dataItems) {
      res.json(name.name);
    }
  } catch (error) {
    console.error("Error searching for artist: ", error);
    res.status(500).send("An error occurred while searching");
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
  returnImage,
  searchArtistName,
};
