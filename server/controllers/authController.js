const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'student',
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                savedJobs: user.savedJobs,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                role: user.role,
                savedJobs: user.savedJobs,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    const user = await User.findById(req.user.id).populate('savedJobs');
    res.status(200).json(user);
};

// @desc    Toggle save/unsave a job
// @route   PUT /api/auth/save/:jobId
// @access  Private
const toggleSaveJob = async (req, res) => {
    try {
        console.log("Toggle Save Job called with ID:", req.params.jobId);
        const user = await User.findById(req.user.id);
        const jobId = req.params.jobId;

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.savedJobs.includes(jobId)) {
            // Unsave
            user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
        } else {
            // Save
            user.savedJobs.push(jobId);
        }

        await user.save();

        // Return updated user with populated savedJobs
        const updatedUser = await User.findById(req.user.id).populate('savedJobs');
        res.status(200).json(updatedUser.savedJobs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    toggleSaveJob,
};
