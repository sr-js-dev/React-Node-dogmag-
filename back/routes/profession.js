const express = require('express');
const router = express.Router();

const {
  create,
  professionById,
  read,
  update,
  remove,
  list,
  photo,
  photog
} = require('../controllers/profession');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/profession/:professionId', read);

router.post(
  '/profession/create/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  create
);
router.put(
  '/profession/:professionId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  '/profession/:professionId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.get('/professions', list);

router.get('/profession/photo/:professionId', photo);

router.get('/profession/photog/:professionId', photog);

router.param('professionId', professionById);
router.param('userId', userById);

module.exports = router;
