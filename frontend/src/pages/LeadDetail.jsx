import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';

const LeadDetail = () => {
  const { id } = useParams(); // Lead ID from the URL
  const navigate = useNavigate();

  const [lead, setLead] = useState(null); // Lead data
  const [contacts, setContacts] = useState([]); // Associated contacts
  const [interactions, setInteractions] = useState([]); // Associated interactions
  const [callSchedule, setCallSchedule] = useState([]); // Call schedules
  const [newCall, setNewCall] = useState({ date: '', notes: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeadDetails = async () => {
      try {
        setLoading(true);

        // Fetch lead details
        const leadResponse = await axios.get(`/leads/${id}`);
        setLead(leadResponse.data);
        setCallSchedule(leadResponse.data.callSchedule || []);

        // Fetch associated contacts
        const contactsResponse = await axios.get(`/contacts/${id}`);
        setContacts(contactsResponse.data);

        // Fetch associated interactions
        const interactionsResponse = await axios.get(`/interactions/${id}`);
        setInteractions(interactionsResponse.data);

        setError('');
      } catch (err) {
        console.error('Error fetching lead details:', err);
        setError(err.response?.status === 404 ? 'Lead not found' : 'Error fetching lead details');
      } finally {
        setLoading(false);
      }
    };

    fetchLeadDetails();
  }, [id]);

  const handleAddCall = async () => {
    if (!newCall.date || !newCall.notes) {
      alert('Please fill all the fields!');
      return;
    }

    try {
      const response = await axios.post(`/leads/${id}/calls`, newCall);
      setCallSchedule(response.data);
      setNewCall({ date: '', notes: '' });
      alert('Call scheduled successfully!');
    } catch (err) {
      console.error('Error scheduling call:', err);
    }
  };

  const handleDeleteCall = async (callId) => {
    try {
      await axios.delete(`/leads/${id}/calls/${callId}`);
      setCallSchedule(callSchedule.filter((call) => call._id !== callId));
      alert('Call deleted successfully!');
    } catch (err) {
      console.error('Error deleting call:', err);
    }
  };

  if (loading) return <div>Loading lead details...</div>;
  if (error) return <div>{error}</div>;

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
        {contacts.length > 0 ? (
          <ul>
            {contacts.map((contact) => (
              <li key={contact._id} style={styles.contactItem}>
                {contact.name} - {contact.role}
                <button
                  onClick={() =>
                    alert(`Contact Details:\nName: ${contact.name}\nPhone: ${contact.phone}\nEmail: ${contact.email}`)
                  }
                  style={styles.viewButton}
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No contacts available for this lead.</p>
        )}
        <button onClick={() => navigate(`/leads/${id}/contacts`)} style={styles.manageContactsButton}>
          Manage Contacts
        </button>
      </section>

      {/* Interaction History */}
      <section style={styles.section}>
        <h2 style={styles.subTitle}>Interaction History</h2>
        {interactions.length > 0 ? (
          <ul>
            {interactions.map((interaction) => (
              <li key={interaction._id}>
                <strong>{interaction.type}:</strong> {interaction.date} - {interaction.notes}
              </li>
            ))}
          </ul>
        ) : (
          <p>No interactions recorded for this lead.</p>
        )}
      </section>

      {/* Call Scheduling */}
      <section style={styles.section}>
        <h2 style={styles.subTitle}>Call Schedule</h2>
        <div style={styles.form}>
          <input
            type="date"
            value={newCall.date}
            onChange={(e) => setNewCall({ ...newCall, date: e.target.value })}
            style={styles.input}
          />
          <textarea
            placeholder="Notes"
            value={newCall.notes}
            onChange={(e) => setNewCall({ ...newCall, notes: e.target.value })}
            style={styles.textarea}
          />
          <button onClick={handleAddCall} style={styles.addButton}>
            Add Call
          </button>
        </div>
        <ul>
          {callSchedule.map((call) => (
            <li key={call._id} style={styles.callItem}>
              <p><strong>Date:</strong> {call.date}</p>
              <p><strong>Notes:</strong> {call.notes}</p>
              <button onClick={() => handleDeleteCall(call._id)} style={styles.deleteButton}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Back Button */}
      <button onClick={() => navigate('/leads')} style={styles.backButton}>
        Back to Leads
      </button>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px' },
  title: { fontSize: '28px', marginBottom: '20px', textAlign: 'center', color: '#333' },
  section: { marginBottom: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' },
  subTitle: { fontSize: '20px', marginBottom: '10px', color: '#007bff' },
  contactItem: { marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  viewButton: { padding: '6px 12px', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', cursor: 'pointer' },
  manageContactsButton: { padding: '10px', backgroundColor: '#28a745', color: '#fff', borderRadius: '4px', cursor: 'pointer' },
  callItem: { padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' },
  deleteButton: { padding: '6px 12px', backgroundColor: '#dc3545', color: '#fff', borderRadius: '4px', cursor: 'pointer' },
  addButton: { padding: '6px 12px', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', cursor: 'pointer' },
  input: { marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' },
  textarea: { marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', height: '80px' },
  backButton: { display: 'block', margin: '20px auto', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
};

export default LeadDetail;
