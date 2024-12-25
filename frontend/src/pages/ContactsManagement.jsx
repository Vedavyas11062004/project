import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LeadsContext } from '../context/LeadsContext';

const ContactsManagement = () => {
  const { id } = useParams();
  const { leads, addContactToLead, deleteContactFromLead } = useContext(LeadsContext);
  const navigate = useNavigate();

  const lead = leads.find((lead) => lead.id === parseInt(id));
  const [contact, setContact] = useState({ name: '', role: '', phone: '', email: '' });
  const [editingContact, setEditingContact] = useState(null);

  const handleAddOrEditContact = () => {
    if (!contact.name || !contact.phone || !contact.email || !contact.role) {
      alert('All fields are required!');
      return;
    }

    if (editingContact) {
      // Edit existing contact
      lead.contacts = lead.contacts.map((c) =>
        c.id === editingContact.id ? { ...editingContact, ...contact } : c
      );
      setEditingContact(null);
      alert('Contact updated successfully!');
    } else {
      // Add new contact
      const newContact = { ...contact, id: Date.now() };
      addContactToLead(lead.id, newContact);
      alert('Contact added successfully!');
    }

    setContact({ name: '', role: '', phone: '', email: '' });
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setContact(contact);
  };

  const handleDeleteContact = (contactId) => {
    deleteContactFromLead(lead.id, contactId);
  };

  if (!lead) {
    return <div>Lead not found</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Manage Contacts for {lead.name}</h1>

      {/* Add or Edit Contact Form */}
      <section style={styles.formSection}>
        <h2 style={styles.subTitle}>
          {editingContact ? 'Edit Contact' : 'Add New Contact'}
        </h2>
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
          <button
            type="button"
            onClick={handleAddOrEditContact}
            style={styles.addButton}
          >
            {editingContact ? 'Update Contact' : 'Add Contact'}
          </button>
          {editingContact && (
            <button
              type="button"
              onClick={() => {
                setEditingContact(null);
                setContact({ name: '', role: '', phone: '', email: '' });
              }}
              style={styles.cancelButton}
            >
              Cancel
            </button>
          )}
        </form>
      </section>

      {/* Existing Contacts */}
      <section style={styles.contactsSection}>
        <h2 style={styles.subTitle}>Existing Contacts</h2>
        {lead.contacts?.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Role</th>
                <th style={styles.tableHeader}>Phone</th>
                <th style={styles.tableHeader}>Email</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lead.contacts.map((contact) => (
                <tr key={contact.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{contact.name}</td>
                  <td style={styles.tableCell}>{contact.role}</td>
                  <td style={styles.tableCell}>{contact.phone}</td>
                  <td style={styles.tableCell}>{contact.email}</td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => handleEditContact(contact)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={styles.noContactsText}>No contacts available</p>
        )}
      </section>

      <button onClick={() => navigate('/leads')} style={styles.backButton}>
        Back to Leads
      </button>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '900px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px' },
  title: { fontSize: '28px', textAlign: 'center', marginBottom: '20px', color: '#333' },
  formSection: { marginBottom: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' },
  subTitle: { fontSize: '20px', marginBottom: '15px', color: '#007bff' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px', width: '100%' },
  addButton: { padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
  cancelButton: { padding: '10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
  contactsSection: { padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { backgroundColor: '#007bff', color: '#fff', padding: '12px', fontWeight: 'bold', textAlign: 'left' },
  tableRow: { borderBottom: '1px solid #ddd' },
  tableCell: { padding: '12px', fontSize: '14px', color: '#333' },
  editButton: { padding: '6px 12px', backgroundColor: '#ffc107', color: '#fff', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' },
  deleteButton: { padding: '6px 12px', backgroundColor: '#dc3545', color: '#fff', borderRadius: '4px', cursor: 'pointer' },
  noContactsText: { textAlign: 'center', fontSize: '16px', color: '#666', marginTop: '10px' },
  backButton: { display: 'block', margin: '20px auto 0', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
};

export default ContactsManagement;
