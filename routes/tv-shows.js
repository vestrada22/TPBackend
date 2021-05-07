const { Router } = require('express');
const { getTvShows } = require('../controllers/tv-shows');

const router = Router();

router.get('/tvshows', getTvShows)

module.exports = router