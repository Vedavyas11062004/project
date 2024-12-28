const Interaction = require('../models/Interaction');
const mongoose = require('mongoose');

// Fetch all interactions or interactions for a specific lead
const getInteractions = async (req, res) => {
  try {
    const { leadId } = req.params;
    const interactions = leadId
      ? await Interaction.find({ lead: leadId }).populate('lead', 'name')
      : await Interaction.find().populate('lead', 'name');
    res.status(200).json(interactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interactions', error: error.message });
  }
};

// Add a new interaction for a specific lead
const addInteraction = async (req, res) => {
  try {
    const { leadId } = req.params;
    if (!mongoose.isValidObjectId(leadId)) {
      return res.status(400).json({ message: 'Invalid lead ID' });
    }
    const newInteraction = new Interaction({
      ...req.body,
      lead: leadId,
    });
    const savedInteraction = await newInteraction.save();
    res.status(201).json(savedInteraction);
  } catch (error) {
    res.status(400).json({ message: 'Error adding interaction', error: error.message });
  }
};

// Update a specific interaction
const updateInteraction = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid interaction ID' });
    }
    const updatedInteraction = await Interaction.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedInteraction) {
      return res.status(404).json({ message: 'Interaction not found' });
    }
    res.status(200).json(updatedInteraction);
  } catch (error) {
    res.status(400).json({ message: 'Error updating interaction', error: error.message });
  }
};

// Delete a specific interaction
const deleteInteraction = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid interaction ID' });
    }
    const deletedInteraction = await Interaction.findByIdAndDelete(id);
    if (!deletedInteraction) {
      return res.status(404).json({ message: 'Interaction not found' });
    }
    res.status(200).json({ message: 'Interaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting interaction', error: error.message });
  }
};

// Fetch interactions summary for dashboard
const getInteractionsSummary = async (req, res) => {
  try {
    const interactionsSummary = await Interaction.aggregate([
      { $group: { _id: '$lead', interactionCount: { $sum: 1 } } },
      {
        $lookup: {
          from: 'leads',
          localField: '_id',
          foreignField: '_id',
          as: 'leadDetails',
        },
      },
      {
        $project: {
          _id: 0,
          leadId: '$_id',
          interactionCount: 1,
          leadName: { $arrayElemAt: ['$leadDetails.name', 0] },
        },
      },
    ]);
    res.status(200).json(interactionsSummary);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interaction summary', error: error.message });
  }
};

module.exports = {
  getInteractions,
  addInteraction,
  updateInteraction,
  deleteInteraction,
  getInteractionsSummary,
};
