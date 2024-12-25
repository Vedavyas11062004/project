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
    <div>
      <h1>{isEdit ? 'Edit Lead' : 'Add New Lead'}</h1>
      <form>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Restaurant Name"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Address"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Phone"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />
        <select
          name="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Interested">Interested</option>
        </select>
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={() => navigate('/leads')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEditLead;
