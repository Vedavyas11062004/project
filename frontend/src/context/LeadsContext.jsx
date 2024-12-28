import React, { createContext, useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';

export const LeadsContext = createContext();

export const LeadsProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leads from the backend
  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/leads'); // Correct API endpoint
        setLeads(response.data);
      } catch (error) {
        setError('Error fetching leads');
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  // Add a new lead
  const addLead = async (lead) => {
    try {
      const response = await axios.post('/leads', lead); // Add lead
      setLeads((prevLeads) => [...prevLeads, response.data]);
    } catch (error) {
      console.error('Error adding lead:', error);
    }
  };

  // Edit an existing lead
  const editLead = async (updatedLead) => {
    try {
      const response = await axios.put(`/leads/${updatedLead._id}`, updatedLead); // Update lead
      setLeads((prevLeads) =>
        prevLeads.map((lead) => (lead._id === updatedLead._id ? response.data : lead))
      );
    } catch (error) {
      console.error('Error editing lead:', error);
    }
  };

  // Delete a lead
  const deleteLead = async (id) => {
    try {
      await axios.delete(`/leads/${id}`); // Delete lead
      setLeads((prevLeads) => prevLeads.filter((lead) => lead._id !== id));
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  // Fetch a lead by ID (with contacts and interactions populated)
  const fetchLeadById = async (id) => {
    try {
      const response = await axios.get(`/leads/${id}`); // Fetch lead details
      return response.data;
    } catch (error) {
      console.error('Error fetching lead by ID:', error);
      throw error;
    }
  };

  // Fetch contacts for a specific lead
  const fetchContactsByLeadId = async (leadId) => {
    try {
      const response = await axios.get(`/contacts/${leadId}`); // Fetch contacts for a lead
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  };

  return (
    <LeadsContext.Provider
      value={{
        leads,
        loading,
        error,
        addLead,
        editLead,
        deleteLead,
        fetchLeadById,
        fetchContactsByLeadId, // Added fetchContactsByLeadId
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};
