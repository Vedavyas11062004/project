import React, { createContext, useState, useEffect } from 'react';

export const LeadsContext = createContext();

export const LeadsProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);

  // Load leads from Local Storage on initial load
  useEffect(() => {
    const storedLeads = JSON.parse(localStorage.getItem('leads')) || [];
    setLeads(storedLeads);
  }, []);

  // Save leads to Local Storage whenever they change
  const saveLeadsToLocalStorage = (updatedLeads) => {
    localStorage.setItem('leads', JSON.stringify(updatedLeads));
  };

  const addLead = (newLead) => {
    const updatedLeads = [...leads, newLead];
    setLeads(updatedLeads);
    saveLeadsToLocalStorage(updatedLeads); // Save to Local Storage
  };

  const editLead = (updatedLead) => {
    const updatedLeads = leads.map((lead) =>
      lead.id === updatedLead.id ? updatedLead : lead
    );
    setLeads(updatedLeads);
    saveLeadsToLocalStorage(updatedLeads); // Save to Local Storage
  };

  const addContactToLead = (leadId, newContact) => {
    const updatedLeads = leads.map((lead) =>
      lead.id === leadId
        ? { ...lead, contacts: [...(lead.contacts || []), newContact] }
        : lead
    );
    setLeads(updatedLeads);
    saveLeadsToLocalStorage(updatedLeads); // Save to Local Storage
  };

  const deleteContactFromLead = (leadId, contactId) => {
    const updatedLeads = leads.map((lead) =>
      lead.id === leadId
        ? { ...lead, contacts: lead.contacts.filter((contact) => contact.id !== contactId) }
        : lead
    );
    setLeads(updatedLeads);
    saveLeadsToLocalStorage(updatedLeads); // Save to Local Storage
  };
  const addInteractionToLead = (leadId, interaction) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === parseInt(leadId)
          ? { ...lead, interactions: [...(lead.interactions || []), interaction] }
          : lead
      )
    );
  };

  return (
    <LeadsContext.Provider
      value={{ leads, addLead, editLead, addContactToLead, deleteContactFromLead, addInteractionToLead }}
    >
      {children}
    </LeadsContext.Provider>
  );
};
