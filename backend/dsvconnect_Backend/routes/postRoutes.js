const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');

const router = express.Router();

router.post('/newPost', createPost);
router.get('/', getPosts);

module.exports = router;
