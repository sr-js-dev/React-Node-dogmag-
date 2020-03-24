const express = require('express');

const router = express.Router();

const {
  create,
  professionalById,
  read,
  update,
  remove,
  list,
  logo,
  g1,
  g2,
  g3,
  g4,
  g5,
  g6,
  addAndUpdateImages,
  addComment,
  removeComment,
  addArea,
  removeArea,
  listBySearch,
  updateInfo,
  filteredProfessionalProfilelist
} = require('../controllers/professionalProfile');
const {
  requireSignin,
  isAuth,
  isAdmin,
  isProfessional
} = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/professional/profile/:professionalId', read);

//only the admin can create the profile for the professional
//but the professional can update the fields
router.post(
  '/professional/profile/create/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  create
);

router.put(
  '/professional/addArea/:professionalId/:userId',
  requireSignin,
  isProfessional,
  addArea
);

router.put(
  '/professional/removeArea/:professionalId/:district_id/:userId',
  requireSignin,
  isProfessional,
  removeArea
);

router.put(
  '/professional/addcomment/:professionalId/:userId',
  requireSignin,
  isAuth,
  addComment
);

router.delete(
  '/professional/removecomment/:professionalId/:userId/:comment_id',
  requireSignin,
  isAuth,
  removeComment
);

router.put(
  '/professional/profile/:professionalId/:userId',
  requireSignin,
  isAuth,
  isProfessional,
  update
);

router.put(
  '/professional/updateprofile/:professionalId/:userId',
  requireSignin,
  isAuth,
  isProfessional,
  updateInfo
);
router.delete(
  '/professional/profile/:professionalId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.get('/professionals', list);
// router.get('/professionalsfilter/:query', filteredProfessionalProfilelist);

router.post('/professionalsfilter', filteredProfessionalProfilelist);

router.get('/professional/logo/:professionalId', logo);

router.post('/professionals/by/search', listBySearch);

router.param('professionalId', professionalById);
router.param('userId', userById);

module.exports = router;
