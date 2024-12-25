import React from "react";

const LeadTable = ({ leads, deleteLead }) => {
  return (
    <div id="lead-list" className="mt-5">
      <h2>All Leads</h2>
      {leads.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Assigned KAM</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.address}</td>
                <td>{lead.contact_number}</td>
                <td>{lead.status}</td>
                <td>{lead.assigned_kam}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteLead(lead.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leads available</p>
      )}
    </div>
  );
};

export default LeadTable;