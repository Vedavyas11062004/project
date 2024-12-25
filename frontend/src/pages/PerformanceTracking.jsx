import React, { useContext } from 'react';
import { LeadsContext } from '../context/LeadsContext';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PerformanceTracking = () => {
  const { leads } = useContext(LeadsContext);

  // Helper functions
  const getPerformanceMetrics = () => {
    let wellPerforming = 0;
    let underPerforming = 0;

    leads.forEach((lead) => {
      const totalOrders = lead.orders?.reduce((sum, order) => sum + order.amount, 0) || 0;
      const recentInteractions = lead.interactions?.filter((interaction) => {
        const interactionDate = new Date(interaction.date);
        const today = new Date();
        const differenceInDays = Math.floor(
          (today - interactionDate) / (1000 * 60 * 60 * 24)
        );
        return differenceInDays <= 30;
      }).length || 0;

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
        data: leads.map((lead) => lead.interactions?.length || 0),
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

      {/* Detailed Performance Table */}
      <section style={styles.tableSection}>
        <h2>Detailed Performance Metrics</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Interactions (Last 30 Days)</th>
              <th style={styles.tableHeader}>Total Orders ($)</th>
              <th style={styles.tableHeader}>Performance</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const totalOrders = lead.orders?.reduce((sum, order) => sum + order.amount, 0) || 0;
              const recentInteractions = lead.interactions?.filter((interaction) => {
                const interactionDate = new Date(interaction.date);
                const today = new Date();
                const differenceInDays = Math.floor(
                  (today - interactionDate) / (1000 * 60 * 60 * 24)
                );
                return differenceInDays <= 30;
              }).length || 0;

              const performance =
                recentInteractions > 3 || totalOrders > 500
                  ? 'Well-Performing'
                  : recentInteractions === 0 || totalOrders < 100
                  ? 'Underperforming'
                  : 'Average';

              return (
                <tr key={lead.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{lead.name}</td>
                  <td style={styles.tableCell}>{recentInteractions}</td>
                  <td style={styles.tableCell}>${totalOrders}</td>
                  <td
                    style={{
                      ...styles.tableCell,
                      color:
                        performance === 'Well-Performing'
                          ? '#28a745'
                          : performance === 'Underperforming'
                          ? '#dc3545'
                          : '#ffc107',
                    }}
                  >
                    {performance}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
  tableSection: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { backgroundColor: '#007bff', color: '#fff', textAlign: 'left', padding: '12px' },
  tableRow: { borderBottom: '1px solid #ddd' },
  tableCell: { padding: '12px', textAlign: 'left' },
};

export default PerformanceTracking;
