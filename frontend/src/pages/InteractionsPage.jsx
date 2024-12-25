import React, { useContext, useState } from 'react';
import { LeadsContext } from '../context/LeadsContext';

const InteractionsPage = () => {
  const { leads, addInteractionToLead } = useContext(LeadsContext);
  const [selectedLead, setSelectedLead] = useState('');
  const [interactionType, setInteractionType] = useState('Call');
  const [interactionDetails, setInteractionDetails] = useState({ date: '', notes: '', orderAmount: '' });

  const handleAddInteraction = () => {
    if (!selectedLead || !interactionDetails.date || !interactionDetails.notes) {
      alert('Please fill all required fields!');
      return;
    }

    const interaction = {
      type: interactionType,
      date: interactionDetails.date,
      notes: interactionDetails.notes,
      orderAmount: interactionType === 'Order' ? interactionDetails.orderAmount : undefined,
    };

    addInteractionToLead(selectedLead, interaction);

    setInteractionDetails({ date: '', notes: '', orderAmount: '' });
    alert('Interaction added successfully!');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Interactions</h1>

      {/* Interaction Form */}
      <div style={styles.form}>
        <select
          value={selectedLead}
          onChange={(e) => setSelectedLead(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Lead</option>
          {leads.map((lead) => (
            <option key={lead.id} value={lead.id}>
              {lead.name}
            </option>
          ))}
        </select>

        <select
          value={interactionType}
          onChange={(e) => setInteractionType(e.target.value)}
          style={styles.input}
        >
          <option value="Call">Call</option>
          <option value="Order">Order</option>
        </select>

        <input
          type="date"
          value={interactionDetails.date}
          onChange={(e) => setInteractionDetails({ ...interactionDetails, date: e.target.value })}
          style={styles.input}
        />

        <textarea
          placeholder="Notes"
          value={interactionDetails.notes}
          onChange={(e) => setInteractionDetails({ ...interactionDetails, notes: e.target.value })}
          style={styles.textarea}
        />

        {interactionType === 'Order' && (
          <input
            type="number"
            placeholder="Order Amount"
            value={interactionDetails.orderAmount}
            onChange={(e) => setInteractionDetails({ ...interactionDetails, orderAmount: e.target.value })}
            style={styles.input}
          />
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
            {leads.flatMap((lead) =>
              lead.interactions?.map((interaction, index) => (
                <tr key={`${lead.id}-${index}`} style={styles.tableRow}>
                  <td style={styles.tableCell}>{lead.name}</td>
                  <td style={styles.tableCell}>{interaction.type}</td>
                  <td style={styles.tableCell}>{interaction.date}</td>
                  <td style={styles.tableCell}>{interaction.notes}</td>
                  <td style={styles.tableCell}>
                    {interaction.type === 'Order' ? `$${interaction.orderAmount}` : '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' },
  title: { fontSize: '28px', textAlign: 'center', marginBottom: '20px' },
  subtitle: { fontSize: '20px', marginTop: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '0 auto' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' },
  textarea: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', height: '80px' },
  addButton: { padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  tableContainer: { overflowX: 'auto', marginTop: '20px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { backgroundColor: '#007bff', color: '#fff', padding: '10px', textAlign: 'left' },
  tableRow: { borderBottom: '1px solid #ddd' },
  tableCell: { padding: '10px', textAlign: 'left' },
};

export default InteractionsPage;
