import React, { useState, useEffect } from "react";
import LeadForm from "../components/LeadForm";
import LeadTable from "../components/LeadTable";

export default function LeadManagement() {
    const [leads, setLeads] = useState([]);
    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
        const response = await fetch("http://localhost:3001/api/leads");
        if (!response.ok) throw new Error("Failed to fetch leads");

        const data = await response.json();
        setLeads(data);
        } catch (error) {
        console.error("Error fetching leads:", error);
        alert("Failed to load leads. Please try again later.");
        }
    };

    const addLead = async (newLead) => {
        try {
        const response = await fetch("http://localhost:3001/api/leads", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newLead),
        });

        if (!response.ok) throw new Error("Failed to add lead");

        alert("Lead added successfully!");
        fetchLeads();
        } catch (error) {
        console.error("Error adding lead:", error);
        alert("An error occurred while adding the lead.");
        }
    };

    const deleteLead = async (id) => {
        if (window.confirm("Are you sure you want to delete this lead?")) {
        try {
            const response = await fetch(`http://localhost:3001/api/leads/${id}`, {
            method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete lead");

            alert("Lead deleted successfully!");
            fetchLeads();
        } catch (error) {
            console.error("Error deleting lead:", error);
            alert("An error occurred while deleting the lead.");
        }
        }
    };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Lead Management Dashboard</h1>
      <LeadForm addLead={addLead} />
      <LeadTable leads={leads} deleteLead={deleteLead} />
    </div>
  );
}
