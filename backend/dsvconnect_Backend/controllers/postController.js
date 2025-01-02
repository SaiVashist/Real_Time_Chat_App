const Post = require('../models/Post');

// Create a new post
const createPost = async (req, res) => {
  try {
    const { userId, content, media } = req.body;
    const post = new Post({ userId, content, media });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'username profilePicture');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPost,
  getPosts
};
