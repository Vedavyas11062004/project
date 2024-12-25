import React, { useState } from "react";

const LeadForm = ({ addLead }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact_number: "",
    status: "New",
    assigned_kam: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addLead(formData);
    setFormData({
      name: "",
      address: "",
      contact_number: "",
      status: "New",
      assigned_kam: "",
    });
  };

  return (
    <div id="add-lead-form" className="mt-4">
      <h2>Add New Lead</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact_number">Contact Number</label>
          <input
            type="text"
            className="form-control"
            id="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="assigned_kam">Assigned KAM</label>
          <input
            type="text"
            className="form-control"
            id="assigned_kam"
            value={formData.assigned_kam}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Lead
        </button>
      </form>
    </div>
  );
};

export default LeadForm;