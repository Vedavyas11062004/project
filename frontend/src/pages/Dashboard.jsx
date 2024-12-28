import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserPlus, FaPhoneAlt, FaChartBar, FaHome, FaEnvelope, FaTasks } from 'react-icons/fa';
import axios from '../utils/axiosConfig';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const navigate = useNavigate();

  // State variables for metrics
  const [totalLeads, setTotalLeads] = useState(0);
  const [newLeads, setNewLeads] = useState(0);
  const [upcomingCalls, setUpcomingCalls] = useState(0);
  const [performance, setPerformance] = useState('Loading...');
  const [interactionChartData, setInteractionChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Interactions',
        data: [],
        backgroundColor: '#007bff',
      },
    ],
  });

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all leads
        const leadsResponse = await axios.get('/leads');
        const leads = leadsResponse.data;

        // Update total leads and new leads
        setTotalLeads(leads.length);
        setNewLeads(leads.filter((lead) => lead.status === 'New').length);

        // Calculate performance
        setPerformance(leads.length > 10 ? 'Good' : 'Needs Improvement');

        // Calculate upcoming calls
        const upcomingCallsCount = leads.reduce((count, lead) => {
          const scheduledCalls = lead.callSchedule?.filter((call) => call.status === 'Scheduled') || [];
          return count + scheduledCalls.length;
        }, 0);
        setUpcomingCalls(upcomingCallsCount);

        // Fetch interaction data for the chart
        const interactionsResponse = await axios.get('/interactions/dashboard');
        const interactionData = interactionsResponse.data;

        // Update chart data
        setInteractionChartData({
          labels: interactionData.map((item) => item.leadName),
          datasets: [
            {
              label: 'Total Interactions',
              data: interactionData.map((item) => item.interactionCount),
              backgroundColor: '#007bff',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

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
                {interactionChartData.labels.map((label, index) => (
                  <li key={index}>
                    {label} - Interactions: {interactionChartData.datasets[0].data[index]}
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
