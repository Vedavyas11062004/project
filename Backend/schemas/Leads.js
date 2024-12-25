const mongoose = require('mongoose');

// Define the schema
const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    role: {
        type: String,
        required: true,
        maxlength: 50
    },
    contact_info: {
        type: String,
        required: true,
        maxlength: 150
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId, // References the Restaurant model
        ref: 'Restaurant',
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
leadSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});

// Create the model
const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;