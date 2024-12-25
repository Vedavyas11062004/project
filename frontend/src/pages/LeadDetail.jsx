import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LeadsContext } from '../context/LeadsContext';

const LeadDetail = () => {
  const { id } = useParams();
  const { leads, editLead } = useContext(LeadsContext);
  const navigate = useNavigate();
  const lead = leads.find((lead) => lead.id === parseInt(id));

  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditingCallPlanning, setIsEditingCallPlanning] = useState(false);
  const [callFrequency, setCallFrequency] = useState(lead?.callFrequency || '');
  const [lastCallDate, setLastCallDate] = useState(lead?.lastCallDate || '');

  const handleSaveFrequency = () => {
    const updatedLead = { ...lead, callFrequency, lastCallDate };
    editLead(updatedLead);
    setIsEditingCallPlanning(false);
    alert('Call planning details updated successfully!');
  };

  const requiresCallToday = () => {
    if (!lead?.lastCallDate || !lead.callFrequency) return false;

    const lastCall = new Date(lead.lastCallDate);
    const today = new Date();
    const differenceInDays = Math.floor(
      (today - lastCall) / (1000 * 60 * 60 * 24)
    );

    if (
      (lead.callFrequency === 'Daily' && differenceInDays >= 1) ||
      (lead.callFrequency === 'Weekly' && differenceInDays >= 7) ||
      (lead.callFrequency === 'Monthly' && differenceInDays >= 30)
    ) {
      return true;
    }
    return false;
  };

  if (!lead) return <div>Lead not found</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{lead.name} - Lead Details</h1>

      {/* Lead Information */}
      <section style={styles.section}>
        <h2 style={styles.subTitle}>Lead Information</h2>
        <p><strong>Email:</strong> {lead.email}</p>
        <p><strong>Phone:</strong> {lead.phone}</p>
        <p><strong>Status:</strong> {lead.status}</p>
        <p><strong>Address:</strong> {lead.address}</p>
      </section>

      {/* Associated Contacts */}
      <section style={styles.section}>
        <h2 style={styles.subTitle}>Associated Contacts</h2>
        {lead.contacts?.length ? (
          <ul>
            {lead.contacts.map((contact) => (
              <li key={contact.id} style={styles.contactItem}>
                {contact.name} - {contact.role}
                <button
                  onClick={() => setSelectedContact(contact)}
                  style={styles.viewButton}
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No contacts available</p>
        )}
        <button
          onClick={() => navigate(`/leads/${lead.id}/contacts`)}
          style={styles.manageContactsButton}
        >
          Manage Contacts
        </button>
      </section>

      {/* Interaction History */}
      <section style={styles.section}>
        <h2 style={styles.subTitle}>Interaction History</h2>
        {lead.interactions?.length ? (
          <ul>
            {lead.interactions.map((interaction, index) => (
              <li key={index}>
                <strong>{interaction.type}:</strong> {interaction.date} -{' '}
                {interaction.notes}
              </li>
            ))}
          </ul>
        ) : (
          <p>No interactions recorded</p>
        )}
      </section>

      {/* Call Planning */}
      <section style={styles.section}>
        <h2 style={styles.subTitle}>Call Planning</h2>
        {!isEditingCallPlanning ? (
          <>
            <p><strong>Last Call Date:</strong> {lead.lastCallDate || 'Not available'}</p>
            <p><strong>Call Frequency:</strong> {lead.callFrequency || 'Not set'}</p>
            {requiresCallToday() && (
              <p style={styles.alert}>This lead requires a call today!</p>
            )}
            <button
              onClick={() => setIsEditingCallPlanning(true)}
              style={styles.editButton}
            >
              Edit Call Planning
            </button>
          </>
        ) : (
          <>
            <label>
              Set Call Frequency:
              <select
                value={callFrequency}
                onChange={(e) => setCallFrequency(e.target.value)}
                style={styles.input}
              >
                <option value="">Select Frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </label>
            <label>
              Set Last Call Date:
              <input
                type="date"
                value={lastCallDate}
                onChange={(e) => setLastCallDate(e.target.value)}
                style={styles.input}
              />
            </label>
            <button onClick={handleSaveFrequency} style={styles.saveButton}>
              Save
            </button>
            <button
              onClick={() => setIsEditingCallPlanning(false)}
              style={styles.cancelButton}
            >
              Cancel
            </button>
          </>
        )}
      </section>

      {/* Contact Popup */}
      {selectedContact && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <h3>{selectedContact.name} - Details</h3>
            <p><strong>Role:</strong> {selectedContact.role}</p>
            <p><strong>Phone:</strong> {selectedContact.phone}</p>
            <p><strong>Email:</strong> {selectedContact.email}</p>
            <button
              onClick={() => setSelectedContact(null)}
              style={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px' },
  title: { fontSize: '28px', marginBottom: '20px', textAlign: 'center', color: '#333' },
  section: { marginBottom: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' },
  subTitle: { fontSize: '20px', marginBottom: '10px', color: '#007bff' },
  contactItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  viewButton: { padding: '6px 12px', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', cursor: 'pointer' },
  manageContactsButton: { padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', borderRadius: '4px', cursor: 'pointer' },
  editButton: { padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', borderRadius: '4px', cursor: 'pointer' },
  saveButton: { padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', borderRadius: '4px', cursor: 'pointer' },
  cancelButton: { padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' },
  alert: { color: '#dc3545', fontWeight: 'bold' },
  input: { display: 'block', margin: '10px 0', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' },
  popup: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  popupContent: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', textAlign: 'center' },
  closeButton: { marginTop: '10px', padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};

export default LeadDetail;
