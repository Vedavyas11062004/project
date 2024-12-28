const express = require('express');
const {
  getInteractions,
  addInteraction,
  updateInteraction,
  deleteInteraction,
  getInteractionsSummary,
} = require('../controllers/interactionsController');

const router = express.Router();

// Routes for managing interactions
router.get('/', getInteractions); // Fetch all interactions
router.get('/dashboard', getInteractionsSummary); // Fetch interaction summary for dashboard
router.get('/:leadId', getInteractions); // Fetch interactions for a specific lead
router.post('/:leadId', addInteraction); // Add interaction for a specific lead
router.put('/:id', updateInteraction); // Update a specific interaction
router.delete('/:id', deleteInteraction); // Delete a specific interaction

module.exports = router;
