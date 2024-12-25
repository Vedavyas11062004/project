import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserPlus, FaPhoneAlt, FaChartBar, FaHome, FaEnvelope, FaTasks } from 'react-icons/fa';
import { LeadsContext } from '../context/LeadsContext';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const navigate = useNavigate();
  const { leads } = useContext(LeadsContext);

  // Calculate dynamic metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === 'New').length;
  const upcomingCalls = leads.filter((lead) => {
    const today = new Date();
    const lastCallDate = lead.lastCallDate ? new Date(lead.lastCallDate) : null;
    if (!lastCallDate || !lead.callFrequency) return false;

    const daysSinceLastCall = Math.floor((today - lastCallDate) / (1000 * 60 * 60 * 24));
    return (
      (lead.callFrequency === 'Daily' && daysSinceLastCall >= 1) ||
      (lead.callFrequency === 'Weekly' && daysSinceLastCall >= 7) ||
      (lead.callFrequency === 'Monthly' && daysSinceLastCall >= 30)
    );
  }).length;

  const performance = totalLeads > 0 ? 'Good' : 'Needs Improvement';

  // Chart Data for Total Interactions
  const interactionChartData = {
    labels: leads.map((lead) => lead.name),
    datasets: [
      {
        label: 'Total Interactions',
        data: leads.map((lead) => lead.interactions?.length || 0),
        backgroundColor: '#007bff',
      },
    ],
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.welcome}>Welcome to Dashboard</div>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </header>

      {/* Main Layout */}
      <div style={styles.main}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <ul style={styles.navList}>
            <li style={styles.navItem} onClick={() => navigate('/dashboard')}>
              <FaHome style={styles.navIcon} />
              Dashboard
            </li>
            <li style={styles.navItem} onClick={() => navigate('/leads')}>
              <FaUsers style={styles.navIcon} />
              Leads
            </li>
            <li style={styles.navItem} onClick={() => navigate('/contacts')}>
              <FaEnvelope style={styles.navIcon} />
              Contacts
            </li>
            <li style={styles.navItem} onClick={() => navigate('/interactions')}>
              <FaTasks style={styles.navIcon} />
              Interactions
            </li>
            <li style={styles.navItem} onClick={() => navigate('/performance')}>
              <FaChartBar style={styles.navIcon} />
              Performance
            </li>
          </ul>
        </aside>

        {/* Content Area */}
        <main style={styles.content}>
          {/* Summary Cards */}
          <div style={styles.summary}>
            <div style={styles.card}>
              <FaUsers style={styles.icon} />
              <h3>Total Leads</h3>
              <p>{totalLeads}</p>
            </div>
            <div style={styles.card}>
              <FaUserPlus style={styles.icon} />
              <h3>New Leads</h3>
              <p>{newLeads}</p>
            </div>
            <div style={styles.card}>
              <FaPhoneAlt style={styles.icon} />
              <h3>Upcoming Calls</h3>
              <p>{upcomingCalls}</p>
            </div>
            <div style={styles.card}>
              <FaChartBar style={styles.icon} />
              <h3>Performance</h3>
              <p>{performance}</p>
            </div>
          </div>

          {/* Charts and Recent Activity */}
          <div style={styles.mainSection}>
            <div style={styles.charts}>
              <h3>Total Interactions Per Lead</h3>
              <Bar data={interactionChartData} />
            </div>
            <div style={styles.recentActivity}>
              <h3>Recent Activity</h3>
              <ul>
                {leads.slice(0, 3).map((lead) => (
                  <li key={lead.id}>
                    {lead.name} - Last Interaction: {lead.lastCallDate || 'None'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
  },
  welcome: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  main: {
    display: 'flex',
    flex: 1,
  },
  sidebar: {
    width: '220px',
    backgroundColor: '#343a40',
    color: '#fff',
    padding: '20px',
    borderRight: '1px solid #ddd',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    margin: '10px 0',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  navIcon: {
    marginRight: '10px',
    fontSize: '20px',
  },
  content: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f0f2f5',
  },
  summary: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  card: {
    flex: '1',
    margin: '0 10px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  icon: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#007bff',
  },
  mainSection: {
    display: 'flex',
    gap: '20px',
  },
  charts: {
    flex: 2,
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  recentActivity: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default Dashboard;
