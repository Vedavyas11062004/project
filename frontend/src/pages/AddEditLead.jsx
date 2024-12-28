import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';

const AddEditLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    status: 'New',
  });

  const [loading, setLoading] = useState(false);

  // Fetch lead data if editing
  useEffect(() => {
    if (isEdit) {
      const fetchLead = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/leads/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching lead:', error);
          alert('Failed to fetch lead data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      fetchLead();
    }
  }, [id, isEdit]);

  // Save or Update Lead
  const handleSave = async () => {
    try {
      setLoading(true);
      if (isEdit) {
        await axios.put(`/leads/${id}`, formData);
        alert('Lead updated successfully!');
      } else {
        await axios.post('/leads', formData);
        alert('Lead added successfully!');
      }
      navigate('/leads');
    } catch (error) {
      console.error('Error saving lead:', error);
      alert('Failed to save lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{isEdit ? 'Edit Lead' : 'Add New Lead'}</h1>
      {loading ? (
        <p style={styles.loadingText}>Loading...</p>
      ) : (
        <form style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={styles.input}
            required
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            style={styles.input}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Interested">Interested</option>
            <option value="Closed">Closed</option>
          </select>
          <div style={styles.buttonGroup}>
            <button type="button" onClick={handleSave} style={styles.saveButton}>
              Save
            </button>
            <button type="button" onClick={() => navigate('/leads')} style={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' },
  title: { fontSize: '24px', marginBottom: '20px', textAlign: 'center', color: '#333' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' },
  buttonGroup: { display: 'flex', justifyContent: 'space-between' },
  saveButton: { padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' },
  cancelButton: { padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' },
  loadingText: { textAlign: 'center', color: '#666', fontSize: '16px' },
};

export default AddEditLead;
