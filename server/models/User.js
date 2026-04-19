const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'recruiter', 'admin'],
        default: 'student',
    },
    profile: {
        bio: String,
        skills: [String],
        resume: String, // Path to resume file
        company: String, // For recruiters
    },
    savedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
