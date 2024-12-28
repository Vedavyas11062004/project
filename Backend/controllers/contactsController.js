const Contact = require('../models/Contact');
const mongoose = require('mongoose');

// Fetch all contacts for a specific lead
const getContacts = async (req, res) => {
  try {
    const { leadId } = req.params;
    if (!mongoose.isValidObjectId(leadId)) {
      return res.status(400).json({ message: 'Invalid lead ID' });
    }
    const contacts = await Contact.find({ lead: leadId });
    res.status(200).json(contacts); // Always return an array, even if empty
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
};

// Add a new contact to a specific lead
const addContact = async (req, res) => {
  try {
    const { leadId } = req.params;
    if (!mongoose.isValidObjectId(leadId)) {
      return res.status(400).json({ message: 'Invalid lead ID' });
    }
    const newContact = new Contact({ ...req.body, lead: leadId });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(400).json({ message: 'Error adding contact', error: error.message });
  }
};

// Update a specific contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(400).json({ message: 'Error updating contact', error: error.message });
  }
};

// Delete a specific contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(400).json({ message: 'Error deleting contact', error: error.message });
  }
};

module.exports = { getContacts, addContact, updateContact, deleteContact };
