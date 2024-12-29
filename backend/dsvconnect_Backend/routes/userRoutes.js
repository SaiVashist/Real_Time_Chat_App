const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
  searchUsers
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.get('/search', searchUsers);
router.post('/login', loginUser);
router.get('/profile/:id', getUserProfile);

module.exports = router;
