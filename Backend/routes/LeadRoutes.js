const express = require('express');
const router = express.Router();
const Lead = require('../schemas/Leads.js'); 

// Get all leads
router.get('/leads', async (req, res) => {
    try {
        const leads = await Lead.find().populate('restaurant_id');
        res.status(200).json(leads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new lead
router.post('/leads', async (req, res) => {
    try {
        const { name, role, contact_info, restaurant_id } = req.body;

        const lead = new Lead({
            name,
            role,
            contact_info,
            restaurant_id
        });

        await lead.save();
        res.status(201).json({ message: 'Lead added successfully', lead });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a lead
router.put('/leads/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, contact_info, restaurant_id } = req.body;

        const lead = await Lead.findByIdAndUpdate(
            id,
            { name, role, contact_info, restaurant_id },
            { new: true, runValidators: true }
        );

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        res.status(200).json({ message: 'Lead updated successfully', lead });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a lead
router.delete('/leads/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const lead = await Lead.findByIdAndDelete(id);

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        res.status(200).json({ message: 'Lead deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Search leads
router.get('/leads/search', async (req, res) => {
    try {
        const { query } = req.query; // e.g., /leads/search?query=RestaurantName

        const leads = await Lead.find({
            name: { $regex: query, $options: 'i' } // Case-insensitive search
        });

        res.status(200).json(leads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;