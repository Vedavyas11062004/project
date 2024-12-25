import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LeadsContext } from '../context/LeadsContext';

const LeadDetail = () => {
  const { id } = useParams();
  const { leads } = useContext(LeadsContext);
  const navigate = useNavigate();

  const lead = leads.find((lead) => lead.id === parseInt(id));

  if (!lead) {
    return <div>Lead not found</div>;
  }

  return (
    <div>
      <h1>Lead Detail</h1>
      <p>Name: {lead.name}</p>
      <p>Email: {lead.email}</p>
      <p>Phone: {lead.phone}</p>
      <p>Status: {lead.status}</p>
      <p>Address: {lead.address}</p>

      <h2>Associated Contacts</h2>
      <ul>
        {lead.contacts?.map((contact) => (
          <li key={contact.id}>{contact.name} - {contact.role}</li>
        ))}
      </ul>

      <h2>Interaction History</h2>
      <ul>
        {lead.interactions?.map((interaction) => (
          <li key={interaction.id}>{interaction.type} on {interaction.date}</li>
        ))}
      </ul>

      <h2>Order History</h2>
      <ul>
        {lead.orders?.map((order) => (
          <li key={order.id}>Order ID: {order.orderId}, Amount: ${order.amount}</li>
        ))}
      </ul>

      <button onClick={() => navigate('/leads')}>Back</button>
    </div>
  );
};

export default LeadDetail;
