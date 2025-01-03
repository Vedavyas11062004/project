import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';

const LeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  // Fetch leads from the backend
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get('/leads'); // Ensure this endpoint matches backend routes
        console.log('Fetched leads:', response.data); // Debugging line
        setLeads(response.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };
    fetchLeads();
  }, []);

  // Handle lead deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/leads/${id}`);
      setLeads((prevLeads) => prevLeads.filter((lead) => lead._id !== id));
      alert('Lead deleted successfully.');
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('Failed to delete lead.');
    }
  };

  // Filter leads based on search term and status filter
  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter ? lead.status === statusFilter : true)
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        <span style={styles.highlight}>Leads</span> Management
      </h1>

      {/* Search and Filter Section */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search leads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Interested">Interested</option>
          <option value="Closed">Closed</option>
        </select>
        <button
          onClick={() => navigate('/leads/add')}
          style={styles.addButton}
        >
          + Add New Lead
        </button>
      </div>

      {/* Leads Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Last Contacted</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead._id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{lead.name}</td>
                  <td style={styles.tableCell}>{lead.status}</td>
                  <td style={styles.tableCell}>{lead.lastContacted || 'N/A'}</td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => navigate(`/leads/${lead._id}`)}
                      style={styles.viewButton}
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/leads/edit/${lead._id}`)}
                      style={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lead._id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.noData}>
                  No leads found
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
  container: { padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' },
  title: { textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: '#333' },
  highlight: { color: '#007bff' },
  controls: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '20px', gap: '10px' },
  searchInput: { flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' },
  filterSelect: { padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' },
  addButton: { padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', borderRadius: '8px', cursor: 'pointer' },
  tableContainer: { overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { backgroundColor: '#007bff', color: '#fff', textAlign: 'left', padding: '12px', fontWeight: 'bold' },
  tableRow: { borderBottom: '1px solid #ddd' },
  tableCell: { padding: '12px', fontSize: '14px', color: '#333' },
  viewButton: { padding: '6px 12px', backgroundColor: '#28a745', color: '#fff', borderRadius: '4px', marginRight: '8px', cursor: 'pointer' },
  editButton: { padding: '6px 12px', backgroundColor: '#ffc107', color: '#fff', borderRadius: '4px', marginRight: '8px', cursor: 'pointer' },
  deleteButton: { padding: '6px 12px', backgroundColor: '#dc3545', color: '#fff', borderRadius: '4px', cursor: 'pointer' },
  noData: { textAlign: 'center', padding: '20px', fontSize: '16px', color: '#666' },
};

export default LeadsList;
