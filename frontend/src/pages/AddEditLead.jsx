import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LeadsContext } from '../context/LeadsContext';

const AddEditLead = () => {
  const { leads, addLead, editLead } = useContext(LeadsContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);
  const existingLead = isEdit ? leads.find((lead) => lead.id === parseInt(id)) : {};

  const [formData, setFormData] = useState({
    name: existingLead?.name || '',
    address: existingLead?.address || '',
    phone: existingLead?.phone || '',
    email: existingLead?.email || '',
    status: existingLead?.status || 'New',
  });

  const handleSave = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Name, Phone, and Email are required!');
      return;
    }

    const newLead = {
      ...formData,
      id: isEdit ? existingLead.id : Date.now(),
      lastContacted: isEdit ? existingLead.lastContacted : new Date().toISOString().split('T')[0],
      contacts: existingLead?.contacts || [],
    };

    if (isEdit) {
      editLead(newLead);
    } else {
      addLead(newLead);
    }

    navigate('/leads');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{isEdit ? 'Edit Lead' : 'Add New Lead'}</h1>
      <form style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Restaurant Name"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Address"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Phone"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            style={styles.input}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Interested">Interested</option>
          </select>
        </div>
        <div style={styles.buttonGroup}>
          <button type="button" onClick={handleSave} style={styles.saveButton}>
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate('/leads')}
            style={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' },
  title: { textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: '#333' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '16px', fontWeight: 'bold', color: '#555' },
  input: { padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' },
  buttonGroup: { display: 'flex', justifyContent: 'space-between', marginTop: '20px' },
  saveButton: { padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
  cancelButton: { padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
};

export default AddEditLead;
