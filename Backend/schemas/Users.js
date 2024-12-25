const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    },
    role: {
        type: String,
        enum: ['KAM', 'Admin'],
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Add a pre-save hook to update `updated_at` before saving
userSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;