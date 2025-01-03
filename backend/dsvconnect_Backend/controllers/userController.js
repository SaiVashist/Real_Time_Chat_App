const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate JWT Token
const JWT_SECRET = 'my_name';
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
};

const sayHello = (req,res) => {
  return res.status(200).json({data:"hello"})
}
// Register User
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(hashedPassword , "        hashed password")

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT Token
    const token = generateToken(newUser._id);

    // Respond with token
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to register user: ${error.message}` });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);

const testHash = await bcrypt.hash(password, salt);
console.log('Test Hash:', testHash);

const testCompare = await bcrypt.compare(password, testHash);
console.log('Test Compare:', testCompare); // Should be true

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
    }
console.log(testHash , "                 " , user.password)
console.log(testHash === user.password)
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid  password' });
    }

    // Generate token and respond
    res.status(200).json({
      message:'login success full',
      user:{
        id:user._id,
        username:user.username,
        email:user.email,
        token:generateToken(user._id)
      }
      
    });
    // _id: user._id,
    //   username: user.username,
    //   email: user.email,
    //   token: generateToken(user._id),
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profilePicture: user.profilePicture
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchUsers = async (req, res) => {
  const { query,id } = req.query; // Get search query from request

  try {
    const users = await User.find({
      username: { $regex: query, $options: 'i' } // Case-insensitive search
    }).select('username _id profilePicture'); // Return only required fields
    const filteredUser = users
    .filter(u => u._id.toString() !== id) // Exclude current user
    .map(u => ({
      id: u._id.toString(), // Convert _id to id
      username: u.username,
      profilePicture: u.profilePicture,
    }));
    res.status(200).json(filteredUser);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single user
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('friends posts');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {

  getUsers,
  getUserById,
  getUserProfile,
  loginUser,
  registerUser,
  searchUsers,
  sayHello
};
