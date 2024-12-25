import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserPlus, FaPhoneAlt, FaChartBar, FaHome, FaEnvelope, FaTasks } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();

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
            <li
              style={styles.navItem}
              onClick={() => navigate('/dashboard')}
            >
              <FaHome style={styles.navIcon} />
              Dashboard
            </li>
            <li
              style={styles.navItem}
              onClick={() => navigate('/leads')}
            >
              <FaUsers style={styles.navIcon} />
              Leads
            </li>
            <li
              style={styles.navItem}
              onClick={() => navigate('/contacts')}
            >
              <FaEnvelope style={styles.navIcon} />
              Contacts
            </li>
            <li
              style={styles.navItem}
              onClick={() => navigate('/interactions')}
            >
              <FaTasks style={styles.navIcon} />
              Interactions
            </li>
            <li
              style={styles.navItem}
              onClick={() => navigate('/performance')}
            >
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
              <p>50</p>
            </div>
            <div style={styles.card}>
              <FaUserPlus style={styles.icon} />
              <h3>New Leads</h3>
              <p>10</p>
            </div>
            <div style={styles.card}>
              <FaPhoneAlt style={styles.icon} />
              <h3>Upcoming Calls</h3>
              <p>5</p>
            </div>
            <div style={styles.card}>
              <FaChartBar style={styles.icon} />
              <h3>Performance</h3>
              <p>Good</p>
            </div>
          </div>

          {/* Charts and Recent Activity */}
          <div style={styles.mainSection}>
            <div style={styles.charts}>[Performance Charts]</div>
            <div style={styles.recentActivity}>
              <h3>Recent Activity</h3>
              <ul>
                <li>Lead A - Call Scheduled</li>
                <li>Lead B - Follow-up Email Sent</li>
                <li>Lead C - Meeting Scheduled</li>
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
  navItemHover: {
    backgroundColor: '#495057',
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
