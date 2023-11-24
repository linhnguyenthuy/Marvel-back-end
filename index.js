require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/", async (req, res) => {
//   try {
//     const response = await axios.get(
//       `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

app.get("/comic/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.id}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/characters", async (req, res) => {
  try {
    const { page, search } = req.query;
    const limit = 100;
    let pageToSend = 1;
    if (page) {
      pageToSend = page;
    }
    const skip = (pageToSend - 1) * limit;
    let params = {
      limit: limit,
      skip: skip,
      apiKey: process.env.API_KEY,
    };

    if (search) {
      params.name = search;
    }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters`,
      { params }
      // `https://lereacteur-marvel-api.herokuapp.com/characters?limit=${limit}&skip=${skip}&apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/characters/comics/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server has start from ${process.env.PORT}`);
});
