const express = require('express');
const router = express.Router();

const {
  createAndUpdate,
  calendarById,
  read,
  remove,
  list,
  checkOpen,
  checkNight,
  checkSaturday
} = require('../controllers/calendar');

const {
  requireSignin,
  isAuth,
  isAdmin,
  isProfessional
} = require('../controllers/auth');

const { userById } = require('../controllers/user');

router.get('/calendar/:professionalId', read);

router.get('/calendar/check/:professionalId', checkOpen);

router.get('/calendar/night/:professionalId', checkNight);

router.get('/calendar/saturday/:professionalId', checkSaturday);

//route to create
router.post(
  '/add/calendar/:userId/',
  requireSignin,
  isAuth,
  isProfessional,
  createAndUpdate
);
//route to update
router.post(
  '/update/calendar/:professionalId/:userId',
  requireSignin,
  isAuth,
  isProfessional,
  createAndUpdate
);

router.delete(
  '/calendar/:professionalId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.get('/calendars', list);

router.param('professionalId', calendarById);
router.param('userId', userById);

module.exports = router;
