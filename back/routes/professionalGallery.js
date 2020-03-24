const express = require('express');
const router = express.Router();

const {
  read,
  read2,
  professionalById,
  addAndUpdateImages,
  g1,
  g2,
  g3,
  g4,
  g5,
  g6,
  g7,
  g8
} = require('../controllers/professionalGallery');

const {
  requireSignin,
  isAuth,
  isAdmin,
  isProfessional
} = require('../controllers/auth');

const { userById } = require('../controllers/user');

router.post(
  '/professional/update/gallery/:professionalId/:userId',
  requireSignin,
  isAuth,
  isProfessional,
  addAndUpdateImages
);

router.post(
  '/professional/add/gallery/:userId',
  requireSignin,
  isAuth,
  isProfessional,
  addAndUpdateImages
);

router.get('/professional/gallery/g1/:professionalId', g1);
router.get('/professional/gallery/g2/:professionalId', g2);
router.get('/professional/gallery/g3/:professionalId', g3);
router.get('/professional/gallery/g4/:professionalId', g4);
router.get('/professional/gallery/g5/:professionalId', g5);
router.get('/professional/gallery/g6/:professionalId', g6);
router.get('/professional/gallery/g7/:professionalId', g7);
router.get('/professional/gallery/g8/:professionalId', g8);

router.get('/gallery/:professionalId', read);

router.get('/gallery/number/:professionalId', read2);

router.param('professionalId', professionalById);
router.param('userId', userById);

module.exports = router;
