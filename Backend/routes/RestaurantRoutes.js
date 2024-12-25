const express = require('express');
const Restaurant = require('../schemas/Restaurant');
const router = express.Router();

// Get all restaurants
router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching restaurants', error });
    }
});

// Get restaurant by ID
router.get('/restaurants/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching restaurant', error });
    }
});

// Add a new restaurant
router.post('/restaurants', async (req, res) => {
    const { name, address, city, lead_status, kam_id } = req.body;
    try {
        const newRestaurant = new Restaurant({
            name,
            address,
            city,
            lead_status,
            kam_id
        });
        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ message: 'Error adding restaurant', error });
    }
});

// Update restaurant by ID
router.put('/restaurants/:id', async (req, res) => {
    const { id } = req.params;
    const { name, address, city, lead_status, kam_id } = req.body;
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            id,
            { name, address, city, lead_status, kam_id, updated_at: new Date() },
            { new: true } // Return the updated document
        );
        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json(updatedRestaurant);
    } catch (error) {
        res.status(500).json({ message: 'Error updating restaurant', error });
    }
});

// Delete restaurant by ID
router.delete('/restaurants/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
        if (!deletedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting restaurant', error });
    }
});

module.exports = router;