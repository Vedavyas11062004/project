const mongoose = require('mongoose');

// Define the schema
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        maxlength: 50
    },
    lead_status: {
        type: String,
        enum: ['New', 'Contacted', 'Negotiating', 'Closed'],
        default: 'New'
    },
    kam_id: {
        type: mongoose.Schema.Types.ObjectId, // Refers to the `users` collection
        ref: 'User',
        default: null
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
restaurantSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});

// Create the model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;