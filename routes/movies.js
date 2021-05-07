const { Router } = require('express');
const { getMovies } = require('../controllers/movies');

const router = Router();

router.get('/movies', getMovies)

module.exports = router