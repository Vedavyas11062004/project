import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LeadsList from './pages/LeadsList';
import AddEditLead from './pages/AddEditLead';
import LeadDetail from './pages/LeadDetail';
import { LeadsProvider } from './context/LeadsContext';
import ContactsManagement from './pages/ContactsManagement';
import ContactsPage from './pages/ContactsPage';
import InteractionsPage from './pages/InteractionsPage';
const App = () => {
  return (
    <LeadsProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<LeadsList />} />
        <Route path="/leads/add" element={<AddEditLead />} />
        <Route path="/leads/edit/:id" element={<AddEditLead />} />
        <Route path="/leads/:id" element={<LeadDetail />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/contacts/:id" element={<ContactsManagement />} />
        <Route path="/leads/:id/contacts" element={<ContactsManagement />} />
        <Route path="/interactions" element={<InteractionsPage />} />
      </Routes>
    </Router>
    </LeadsProvider>
  );
};

export default App;
