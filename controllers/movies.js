const axios = require('axios');
const { response } = require("express");

const getMovies = async (req, res = response) => {
  try {
    const resp = await axios.get(process.env.MOVIES_URL)
    res.status(200).json(resp.data)
  } catch (error) {
    res.status(400).json(resp.data)
  }
}

module.exports = {
  getMovies
}