const express = require('express');
const {
  getLeads,
  getLeadById,
  addLead,
  updateLead,
  deleteLead,
  getCallSchedule,
  addCallToSchedule,
  deleteCallFromSchedule,
  getMetrics,
} = require('../controllers/leadsController');

const router = express.Router();

router.get('/', getLeads); // Fetch all leads
router.get('/metrics', getMetrics); // Fetch dashboard metrics
router.get('/:id', getLeadById); // Fetch a single lead by ID
router.post('/', addLead); // Add a new lead
router.put('/:id', updateLead); // Update an existing lead
router.delete('/:id', deleteLead); // Delete a lead

// Call schedule routes
router.get('/:id/calls', getCallSchedule); // Get call schedule for a lead
router.post('/:id/calls', addCallToSchedule); // Add a call to the schedule
router.delete('/:id/calls/:callId', deleteCallFromSchedule); // Delete a call from the schedule

module.exports = router;
