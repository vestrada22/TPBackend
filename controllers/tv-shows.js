const axios = require('axios');
const { response } = require("express");

const getTvShows = async (req, res = response) => {
  try {
    const resp = await axios.get(process.env.TV_SHOWS_URL)
    res.status(200).json(resp.data)
  } catch (error) {
    res.status(400).json(resp.data)
  }
}

module.exports = {
  getTvShows
}