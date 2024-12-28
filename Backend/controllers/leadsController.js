const Lead = require('../models/Lead');
const Contact = require('../models/Contact');

// Fetch all leads
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().populate('contacts').populate('interactions');
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leads', error: error.message });
  }
};

// Fetch a lead by ID
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate('contacts').populate('interactions');
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lead', error: error.message });
  }
};

// Add a new lead
const addLead = async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(400).json({ message: 'Error adding lead', error: error.message });
  }
};

// Update a lead
const updateLead = async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(400).json({ message: 'Error updating lead', error: error.message });
  }
};

// Delete a lead
const deleteLead = async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting lead', error: error.message });
  }
};

// Get call schedule for a lead
const getCallSchedule = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json(lead.callSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching call schedule', error: error.message });
  }
};

// Add a call to the schedule
const addCallToSchedule = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    lead.callSchedule.push(req.body);
    await lead.save();
    res.status(201).json(lead.callSchedule);
  } catch (error) {
    res.status(400).json({ message: 'Error adding call to schedule', error: error.message });
  }
};

// Delete a call from the schedule
const deleteCallFromSchedule = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    lead.callSchedule.id(req.params.callId).remove();
    await lead.save();
    res.status(200).json(lead.callSchedule);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting call from schedule', error: error.message });
  }
};

// Fetch lead metrics for the dashboard
const getMetrics = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'New' });
    const upcomingCalls = await Lead.aggregate([
      { $unwind: '$callSchedule' },
      { $match: { 'callSchedule.status': 'Scheduled' } },
    ]).then((calls) => calls.length);

    const performance = totalLeads > 10 ? 'Good' : 'Needs Improvement';

    res.status(200).json({ totalLeads, newLeads, upcomingCalls, performance });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching metrics', error: error.message });
  }
};

module.exports = {
  getLeads,
  getLeadById,
  addLead,
  updateLead,
  deleteLead,
  getCallSchedule,
  addCallToSchedule,
  deleteCallFromSchedule,
  getMetrics,
};
