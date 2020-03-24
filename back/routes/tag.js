const express = require('express');
const router = express.Router();

const {
  create,
  tagById,
  read,
  update,
  remove,
  list
} = require('../controllers/tag');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/tag/:tagId', read);
router.post('/tag/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put('/tag/:tagId/:userId', requireSignin, isAuth, isAdmin, update);
router.delete('/tag/:tagId/:userId', requireSignin, isAuth, isAdmin, remove);
router.get('/tags', list);

router.param('tagId', tagById);
router.param('userId', userById);

module.exports = router;
