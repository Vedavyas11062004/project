import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LeadsContext } from '../context/LeadsContext';

const ContactsManagement = () => {
  const { id } = useParams(); // Get restaurant ID
  const { leads, addContactToLead, deleteContactFromLead } = useContext(LeadsContext);
  const navigate = useNavigate();

  const lead = leads.find((lead) => lead.id === parseInt(id));
  const [contact, setContact] = useState({ name: '', role: '', phone: '', email: '' });

  const handleAddContact = () => {
    if (!contact.name || !contact.phone || !contact.email || !contact.role) {
      alert('All fields are required!');
      return;
    }

    const newContact = { ...contact, id: Date.now() };
    addContactToLead(lead.id, newContact);
    setContact({ name: '', role: '', phone: '', email: '' });
  };

  const handleDeleteContact = (contactId) => {
    deleteContactFromLead(lead.id, contactId);
  };

  if (!lead) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Manage Contacts for {lead.name}</h1>

      {/* Existing Contacts */}
      <h2>Existing Contacts</h2>
      {lead.contacts.length > 0 ? (
        <ul style={styles.contactList}>
          {lead.contacts.map((contact) => (
            <li key={contact.id} style={styles.contactItem}>
              <strong>{contact.name}</strong> - {contact.role} - {contact.phone} - {contact.email}
              <button
                onClick={() => handleDeleteContact(contact.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No contacts added yet.</p>
      )}

      {/* Add New Contact */}
      <h2>Add New Contact</h2>
      <form style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Contact Name"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={contact.role}
          onChange={(e) => setContact({ ...contact, role: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          style={styles.input}
        />
        <button type="button" onClick={handleAddContact} style={styles.addButton}>
          Add Contact
        </button>
      </form>

      <button onClick={() => navigate('/leads')} style={styles.backButton}>
        Back to Leads
      </button>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '600px', margin: '0 auto' },
  contactList: { listStyle: 'none', padding: 0 },
  contactItem: { marginBottom: '10px', display: 'flex', justifyContent: 'space-between' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' },
  addButton: { padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  deleteButton: { padding: '6px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  backButton: { marginTop: '20px', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};

export default ContactsManagement;
