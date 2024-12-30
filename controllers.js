const path = require("path");
require("dotenv").config();
const accessToken = process.env.ACCESS_TOKEN;

const mainPage = (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
};

// const fetchName = async () => {
//   const response = await fetch(
//     `https://api.spotify.com/v1/artists/2xvtxDNInKDV4AvGmjw6d1`,
//     {
//       headers: {
//         AUTHORIZATION: `Bearer ` + accessToken,
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const jsonName = await response.json();
//   return jsonName.name;
// };

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
    const name = await fetchArtist();
    res.json(name);
  } catch (error) {
    console.log("error, ", error);
  }
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
const returnImage = async (req, res) => {
  try {
    const image = await fetchImage();
    res.json(image);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { mainPage, returnName, returnImage };
