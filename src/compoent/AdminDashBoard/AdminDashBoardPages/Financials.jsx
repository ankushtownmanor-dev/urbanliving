import React from 'react';
import './PropertyFinancials.css';

const Financials = () => {
  // Mock data - backend se ayega
  const financialData = {
    totalProperties: 5,
    totalBookings: 127,
    lifetimeIncome: 8945000,
    pendingPayments: 245000,
    completedPayments: 8700000,
    currentMonthEarnings: 425000,
    recentTransactions: [
      {
        id: 1,
        propertyName: "Luxury Villa - Goa",
        bookingId: "BK12845",
        listingAmount: 85000,
        commissionRate: 15,
        commissionAmount: 12750,
        ownerAmount: 72250,
        status: "completed",
        date: "2026-01-20"
      },
      {
        id: 2,
        propertyName: "Beachside Cottage - Kerala",
        bookingId: "BK12844",
        listingAmount: 45000,
        commissionRate: 15,
        commissionAmount: 6750,
        ownerAmount: 38250,
        status: "pending",
        date: "2026-01-18"
      },
      {
        id: 3,
        propertyName: "Mountain View Apartment - Shimla",
        bookingId: "BK12843",
        listingAmount: 32000,
        commissionRate: 15,
        commissionAmount: 4800,
        ownerAmount: 27200,
        status: "completed",
        date: "2026-01-15"
      },
      {
        id: 4,
        propertyName: "City Center Studio - Mumbai",
        bookingId: "BK12842",
        listingAmount: 55000,
        commissionRate: 15,
        commissionAmount: 8250,
        ownerAmount: 46750,
        status: "completed",
        date: "2026-01-12"
      },
      {
        id: 5,
        propertyName: "Heritage Home - Jaipur",
        bookingId: "BK12841",
        listingAmount: 68000,
        commissionRate: 15,
        commissionAmount: 10200,
        ownerAmount: 57800,
        status: "pending",
        date: "2026-01-10"
      }
    ]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="financials-container">
      <div className="financials-header">
        <h1>Financial Overview</h1>
        <p>Track your earnings and property performance</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Lifetime Income</h3>
            <p className="stat-value">{formatCurrency(financialData.lifetimeIncome)}</p>
            <span className="stat-subtitle">Total earnings from all properties</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Total Bookings</h3>
            <p className="stat-value">{financialData.totalBookings}</p>
            <span className="stat-subtitle">Across {financialData.totalProperties} properties</span>
          </div>
        </div>

        <div className="stat-card pending-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>Pending Payments</h3>
            <p className="stat-value">{formatCurrency(financialData.pendingPayments)}</p>
            <span className="stat-subtitle">Payment processing</span>
          </div>
        </div>

        <div className="stat-card success-card">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <h3>Completed Payments</h3>
            <p className="stat-value">{formatCurrency(financialData.completedPayments)}</p>
            <span className="stat-subtitle">Successfully transferred</span>
          </div>
        </div>
      </div>

      <div className="transactions-section">
        <div className="section-header">
          <h2>Recent Transactions</h2>
          <button className="filter-btn">View All</button>
        </div>

        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Property & Booking ID</th>
                <th>Date</th>
                <th>Listed Amount</th>
                <th>Commission ({financialData.recentTransactions[0].commissionRate}%)</th>
                <th>Your Earnings</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {financialData.recentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    <div className="property-info">
                      <strong>{transaction.propertyName}</strong>
                      <span className="booking-id">{transaction.bookingId}</span>
                    </div>
                  </td>
                  <td>{new Date(transaction.date).toLocaleDateString('en-IN')}</td>
                  <td className="amount-cell">{formatCurrency(transaction.listingAmount)}</td>
                  <td className="commission-cell">-{formatCurrency(transaction.commissionAmount)}</td>
                  <td className="earnings-cell">{formatCurrency(transaction.ownerAmount)}</td>
                  <td>
                    <span className={`status-badge ${transaction.status}`}>
                      {transaction.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>This Month</h3>
          <p className="summary-amount">{formatCurrency(financialData.currentMonthEarnings)}</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: '65%'}}></div>
          </div>
          <span className="summary-note">65% of monthly target</span>
        </div>

        <div className="summary-card">
          <h3>Commission Breakdown</h3>
          <div className="commission-details">
            <div className="commission-row">
              <span>Platform Fee</span>
              <strong>15%</strong>
            </div>
            <div className="commission-row">
              <span>You Receive</span>
              <strong className="highlight">85%</strong>
            </div>
          </div>
        </div>

        <div className="summary-card">
          <h3>Quick Stats</h3>
          <div className="quick-stats">
            <div className="quick-stat-item">
              <span>Avg. Booking Value</span>
              <strong>{formatCurrency(57000)}</strong>
            </div>
            <div className="quick-stat-item">
              <span>Properties Listed</span>
              <strong>{financialData.totalProperties}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financials;