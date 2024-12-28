import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const InteractionsPage = () => {
  const [leads, setLeads] = useState([]);
  const [leadsMap, setLeadsMap] = useState({});
  const [selectedLead, setSelectedLead] = useState('');
  const [interactionType, setInteractionType] = useState('Call');
  const [interactionDetails, setInteractionDetails] = useState({ date: '', notes: '', orderAmount: '' });
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all leads and interactions
  useEffect(() => {
    const fetchLeadsAndInteractions = async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch leads
        const leadsResponse = await axios.get('/leads');
        const leadsData = leadsResponse.data;

        // Update leads and leadsMap
        setLeads(leadsData);
        const map = leadsData.reduce((acc, lead) => {
          acc[lead._id] = lead.name;
          return acc;
        }, {});
        setLeadsMap(map);

        // Fetch interactions
        const interactionsResponse = await axios.get('/interactions');
        setInteractions(interactionsResponse.data);
      } catch (err) {
        console.error('Error fetching leads or interactions:', err);
        setError('Unable to fetch leads or interactions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeadsAndInteractions();
  }, []);

  const handleAddInteraction = async () => {
    if (!selectedLead || !interactionDetails.date || !interactionDetails.notes) {
      alert('Please fill all required fields!');
      return;
    }

    const newInteraction = {
      lead: selectedLead,
      type: interactionType,
      date: interactionDetails.date,
      notes: interactionDetails.notes,
      orderAmount: interactionType === 'Order' ? interactionDetails.orderAmount : undefined,
    };

    try {
      const response = await axios.post(`/interactions/${selectedLead}`, newInteraction);
      const addedInteraction = response.data;

      setInteractions((prevInteractions) => [...prevInteractions, addedInteraction]);
      setInteractionDetails({ date: '', notes: '', orderAmount: '' });
      alert('Interaction added successfully!');
    } catch (error) {
      console.error('Error adding interaction:', error);
    }
  };

  const getLeadName = (leadId) => {
    return leadsMap[leadId] || 'Unknown Lead';
  };

  if (loading) {
    return <div style={styles.message}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.message}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Interactions</h1>

      {/* Interaction Form */}
      <div style={styles.form}>
        <label style={styles.label}>Select Lead</label>
        <select
          value={selectedLead}
          onChange={(e) => setSelectedLead(e.target.value)}
          style={styles.input}
        >
          <option value="">-- Select Lead --</option>
          {leads.map((lead) => (
            <option key={lead._id} value={lead._id}>
              {lead.name}
            </option>
          ))}
        </select>

        <label style={styles.label}>Interaction Type</label>
        <select
          value={interactionType}
          onChange={(e) => setInteractionType(e.target.value)}
          style={styles.input}
        >
          <option value="Call">Call</option>
          <option value="Order">Order</option>
        </select>

        <label style={styles.label}>Date</label>
        <input
          type="date"
          value={interactionDetails.date}
          onChange={(e) => setInteractionDetails({ ...interactionDetails, date: e.target.value })}
          style={styles.input}
        />

        <label style={styles.label}>Notes</label>
        <textarea
          placeholder="Notes"
          value={interactionDetails.notes}
          onChange={(e) => setInteractionDetails({ ...interactionDetails, notes: e.target.value })}
          style={styles.textarea}
        />

        {interactionType === 'Order' && (
          <>
            <label style={styles.label}>Order Amount</label>
            <input
              type="number"
              placeholder="Order Amount"
              value={interactionDetails.orderAmount}
              onChange={(e) => setInteractionDetails({ ...interactionDetails, orderAmount: e.target.value })}
              style={styles.input}
            />
          </>
        )}

        <button onClick={handleAddInteraction} style={styles.addButton}>
          Add Interaction
        </button>
      </div>

      {/* Interaction Logs */}
      <h2 style={styles.subtitle}>Interaction Logs</h2>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Lead Name</th>
              <th style={styles.tableHeader}>Type</th>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>Notes</th>
              <th style={styles.tableHeader}>Order Amount</th>
            </tr>
          </thead>
          <tbody>
            {interactions.length > 0 ? (
              interactions.map((interaction) => (
                <tr key={interaction._id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{getLeadName(interaction.lead)}</td>
                  <td style={styles.tableCell}>{interaction.type}</td>
                  <td style={styles.tableCell}>{interaction.date}</td>
                  <td style={styles.tableCell}>{interaction.notes}</td>
                  <td style={styles.tableCell}>
                    {interaction.type === 'Order' ? `$${interaction.orderAmount}` : '-'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={styles.noDataCell}>
                  No interactions available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' },
  title: { fontSize: '28px', textAlign: 'center', marginBottom: '20px' },
  subtitle: { fontSize: '20px', marginTop: '20px', textAlign: 'center', color: '#333' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' },
  label: { fontSize: '16px', fontWeight: '500' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' },
  textarea: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', height: '80px', resize: 'none' },
  addButton: { padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
  tableContainer: { overflowX: 'auto', marginTop: '20px' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' },
  tableHeader: { backgroundColor: '#007bff', color: '#fff', padding: '12px', textAlign: 'left', fontWeight: '600' },
  tableRow: { borderBottom: '1px solid #ddd' },
  tableCell: { padding: '12px', textAlign: 'left' },
  noDataCell: { textAlign: 'center', padding: '20px', fontSize: '16px', color: '#999' },
  message: { textAlign: 'center', fontSize: '18px', marginTop: '50px', color: '#666' },
};

export default InteractionsPage;
