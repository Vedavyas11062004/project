import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeadsContext } from '../context/LeadsContext';

const ContactsPage = () => {
  const { leads } = useContext(LeadsContext); // Fetch leads from context
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contacts</h1>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Restaurant Name</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={lead._id} style={styles.tableRow}>
                <td style={styles.tableCell}>{index + 1}</td>
                <td style={styles.tableCell}>{lead.name}</td>
                <td style={styles.tableCell}>
                  <button
                    onClick={() => navigate(`/leads/${lead._id}`)} // Navigate to the LeadDetail page
                    style={styles.viewButton}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' },
  title: { fontSize: '28px', marginBottom: '20px', textAlign: 'center' },
  tableContainer: { overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { backgroundColor: '#007bff', color: '#fff', padding: '12px', fontWeight: 'bold' },
  tableRow: { borderBottom: '1px solid #ddd' },
  tableCell: { padding: '12px', fontSize: '14px', color: '#333' },
  viewButton: { padding: '6px 12px', backgroundColor: '#28a745', color: '#fff', borderRadius: '4px', cursor: 'pointer' },
};

export default ContactsPage;
