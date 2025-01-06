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

const searchArtist = async (req, res) => {
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
    return data.artists.items;
  } catch (error) {
    console.error("Error searching for artist: ", error);
    res.status(500).send("An error occurred while searching");
  }
};
const returnSearch = async (req, res) => {
  try {
    const dataItems = await searchArtist(req, res);
    for (const name of dataItems) {
      const imgURL = await returnImage(req, res);
      const albumsNames = await returnAlbumName(req, res);
      res.send(`<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles.css" />
    <title>ARTIST</title><body>
    <div class="spacing">
    </div>

    <div class="container">
      <div class="center">
      <form method="GET" action="/">
      <button class="button" type="submit">Back to main page</button>
      </form>
      <form method="GET" action="/artist">
          
          <input
            type="searchValue"
            id="searchValue"
            name="searchValue"
            type="text"
            placeholder="Search Artist"
          />
          <button type="submit">Search</button>
        </form>
        <p class="artist">${name.name}</p>
        <img class="img" src="${imgURL}"/>
        <p>${albumsNames}</p>
      </div>
    </div>
    </body>
    `);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const returnID = async (req, res) => {
  try {
    const dataItems = await searchArtist(req, res);
    for (const ID of dataItems) {
      console.log(ID.id);
      return ID.id;
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const returnAlbumName = async (req, res) => {
  try {
    const album = await returnAlbum(req, res);
    for (const name of album) {
      console.log(name.name);
      return name.name;
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};
const fetchArtist = async (req, res) => {
  const artistID = await returnID(req, res);

  if (!artistID) {
    return res.status(400).send("No ID found");
  }
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}`,
      {
        headers: {
          AUTHORIZATION: `Bearer ` + (await userToken()),
          "Content-Type": "application/json",
        },
      }
    );
    const artist = await response.json();
    return artist;
  } catch (error) {
    console.error("Error searching for artist ID: ", error);
    res.status(500).send("An error occurred while searching ID");
  }
};
const returnImage = async (req, res) => {
  try {
    const artist = await fetchArtist(req, res);
    const image = artist.images[1].url;
    console.log(image);
    return image;
  } catch (error) {
    res.json({ error: error.message });
  }
};

const returnAlbum = async (req, res) => {
  const id = await returnID(req, res);

  if (!id) {
    return res.status(400).send("No ID found");
  }

  try {
    const response = fetch(`https://api.spotify.com/v1/artists/${id}/albums`, {
      headers: {
        AUTHORIZATION: `Bearer ` + (await userToken()),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error searching for artist ID: ", error);
    res.status(500).send("An error occurred while searching ID");
  }
  const album = (await response).json();
  return album.albums.items;
};

module.exports = {
  mainPage,
  userToken,
  returnImage,
  returnSearch,
};
