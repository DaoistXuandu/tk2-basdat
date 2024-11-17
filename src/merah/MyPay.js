import React from 'react';
import './MyPay.css';  // akan dibuat setelah ini

const MyPay = () => {
  // Dummy data
  const userData = {
    phoneNumber: "081234567890",
    balance: 1500000
  };

  const transactionHistory = [
    {
      id: 1,
      amount: 50000,
      date: "2024-11-17",
      category: "Top Up"
    },
    {
      id: 2,
      amount: -25000,
      date: "2024-11-16",
      category: "Pembayaran"
    },
    {
      id: 3,
      amount: -15000,
      date: "2024-11-15",
      category: "Transfer"
    }
  ];

  // Format currency to IDR
  const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  return (
    <div className="mypay-container">
      {/* Balance Card */}
      <div className="balance-card">
        <div className="balance-info">
          <div>
            <p className="label">No HP</p>
            <p className="value">{userData.phoneNumber}</p>
          </div>
          <div className="balance">
            <p className="label">Saldo</p>
            <p className="balance-value">{formatIDR(userData.balance)}</p>
          </div>
        </div>
        <button className="transaction-button">Lakukan Transaksi</button>
      </div>

      {/* Transaction History */}
      <div className="history-card">
        <h2>Riwayat Transaksi</h2>
        <div className="transaction-list">
          {transactionHistory.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div>
                <p className={`amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                  {formatIDR(transaction.amount)}
                </p>
                <p className="category">{transaction.category}</p>
              </div>
              <p className="date">
                {new Date(transaction.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPay;