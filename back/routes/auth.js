const express = require('express');
const router = express.Router();

const {
  signup,
  signin,
  signout,
  googlelogin,
  facebooklogin,
  requireSignin
} = require('../controllers/auth');
const { userSignupValidator } = require('../validator/index');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.post('/googlelogin', googlelogin);
router.post('/facebooklogin', facebooklogin);

router.get('/signout', signout);

module.exports = router;
