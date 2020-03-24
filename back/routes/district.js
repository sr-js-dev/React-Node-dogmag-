const express = require('express');
const router = express.Router();

const {
  create,
  districtById,
  read,
  update,
  remove,
  list
} = require('../controllers/district');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/district/:districtId', read);
router.post('/district/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put(
  '/district/:districtId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  '/district/:districtId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.get('/districts', list);

router.param('districtId', districtById);
router.param('userId', userById);

module.exports = router;
