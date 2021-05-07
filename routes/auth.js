const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');
const { fieldValidation } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// Create new User
router.post('/new', [
  check('name', 'the name field is required').not().isEmpty(),
  check('email', 'the email field is required and it must be a valid email').isEmail(),
  check('password', 'the passsword field is required and must have a min 8 characters').isLength({min: 8}),
  check('role', 'the role field is required').not().isEmpty(),
  fieldValidation
], createUser);

// Login
router.post('/', [
  check('email', 'the email field is required and it must be a valid email').isEmail(),
  check('password', 'the passsword field is required and must have a min 8 characters').isLength({min: 8}),
  fieldValidation
], login);

// Validate and renew token
router.get('/renew', validateJWT, renewToken);

module.exports = router