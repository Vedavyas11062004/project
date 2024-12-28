const express = require('express');
const { getContacts, addContact, updateContact, deleteContact } = require('../controllers/contactsController');
const router = express.Router();

// Routes for managing contacts
router.get('/:leadId', getContacts); // Fetch contacts for a specific lead
router.post('/:leadId', addContact); // Add a contact to a specific lead
router.put('/:id', updateContact);   // Update a specific contact
router.delete('/:id', deleteContact); // Delete a specific contact

module.exports = router;
