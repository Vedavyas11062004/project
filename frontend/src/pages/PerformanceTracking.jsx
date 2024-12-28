import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PerformanceTracking = () => {
  const [leads, setLeads] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch leads and interactions
        const [leadsResponse, interactionsResponse] = await Promise.all([
          axios.get('/leads'),
          axios.get('/interactions'),
        ]);

        setLeads(leadsResponse.data);
        setInteractions(interactionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPerformanceMetrics = () => {
    let wellPerforming = 0;
    let underPerforming = 0;

    leads.forEach((lead) => {
      const leadInteractions = interactions.filter((interaction) => interaction.lead === lead._id);

      const totalOrders = lead.orders?.reduce((sum, order) => sum + order.amount, 0) || 0;
      const recentInteractions = leadInteractions.filter((interaction) => {
        const interactionDate = new Date(interaction.date);
        const today = new Date();
        const differenceInDays = Math.floor(
          (today - interactionDate) / (1000 * 60 * 60 * 24)
        );
        return differenceInDays <= 30;
      }).length;

      if (recentInteractions > 3 || totalOrders > 500) {
        wellPerforming++;
      } else if (recentInteractions === 0 || totalOrders < 100) {
        underPerforming++;
      }
    });

    return { wellPerforming, underPerforming, totalLeads: leads.length };
  };

  const performanceMetrics = getPerformanceMetrics();

  const interactionTrendData = {
    labels: leads.map((lead) => lead.name),
    datasets: [
      {
        label: 'Total Interactions',
        data: leads.map((lead) => {
          const leadInteractions = interactions.filter((interaction) => interaction.lead === lead._id);
          return leadInteractions.length;
        }),
        backgroundColor: '#007bff',
      },
    ],
  };

  const performanceDistributionData = {
    labels: ['Well-Performing', 'Underperforming'],
    datasets: [
      {
        data: [performanceMetrics.wellPerforming, performanceMetrics.underPerforming],
        backgroundColor: ['#28a745', '#dc3545'],
      },
    ],
  };

  if (loading) {
    return <div style={styles.message}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.message}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Performance Tracking</h1>

      {/* Metrics Overview */}
      <section style={styles.metricsSection}>
        <div style={styles.metricBox}>
          <h2>Total Leads</h2>
          <p>{performanceMetrics.totalLeads}</p>
        </div>
        <div style={styles.metricBox}>
          <h2>Well-Performing Accounts</h2>
          <p>{performanceMetrics.wellPerforming}</p>
        </div>
        <div style={styles.metricBox}>
          <h2>Underperforming Accounts</h2>
          <p>{performanceMetrics.underPerforming}</p>
        </div>
      </section>

      {/* Charts */}
      <section style={styles.chartsSection}>
        <div style={styles.chartBox}>
          <h2>Interaction Trends</h2>
          <Bar data={interactionTrendData} />
        </div>
        <div style={styles.chartBox}>
          <h2>Performance Distribution</h2>
          <Pie data={performanceDistributionData} />
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: { padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' },
  title: { fontSize: '28px', marginBottom: '20px', textAlign: 'center', color: '#333' },
  metricsSection: { display: 'flex', justifyContent: 'space-around', marginBottom: '30px' },
  metricBox: { padding: '20px', backgroundColor: '#fff', borderRadius: '8px', textAlign: 'center', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' },
  chartsSection: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px', gap: '20px' },
  chartBox: { flex: 1, padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' },
  message: { textAlign: 'center', padding: '20px', fontSize: '18px', color: '#666' },
};

export default PerformanceTracking;
