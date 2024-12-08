import React from 'react';
import { useEffect, useState } from "react";
import './MyPay.css';
import { useCookies } from 'react-cookie'
import { getMyPayBalance, getMyPayHistory } from "../controller/merah";


export default function MyPay() {
  const [cookies, setCookie] = useCookies(['userId', 'status', 'name']);
  const [errorMessage, setErrorMessage] = useState("")
  const [userData, setUserData] = useState({
    phoneNumber: '',
    balance: 0,
  });
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = cookies.userId;

        // Fetch MyPay balance
        const balanceData = await getMyPayBalance(userId, cookies.status == "Pengguna" ? 0 : 1);
        if (balanceData) {
          setUserData({
            phoneNumber: balanceData.no_hp,
            balance: balanceData.balance,
          });
        }

        // Fetch MyPay transaction history
        const historyData = await getMyPayHistory(userId, cookies.status == "Pengguna" ? 0 : 1);
        if (historyData != null) {
          setTransactionHistory(historyData); // Access the History property
        } else {
          setTransactionHistory([]); // Fallback to an empty array
        }
      }
      catch (error) {
        console.error('Error fetching data:', error.message);
        setErrorMessage(error.message); // Set an error message to display
      }
    }

    fetchData();
  }, [cookies.userId]);



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
        <button onClick={() => window.location = "/mypay/transaksi"} className="transaction-button">
          Lakukan Transaksi
        </button>
      </div>

      {/* Transaction History */}
      <div className="history-card">
        <h2>Riwayat Transaksi</h2>
        <div className="transaction-list">
          {transactionHistory.length > 0 ? (
            transactionHistory.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div>
                  <p className={`amount ${transaction.nominal > 0 ? 'positive' : 'negative'}`}>
                    {formatIDR(transaction.nominal)}
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
            ))
          ) : (
            <p>Tidak ada histori transaksi</p>
          )}
        </div>
      </div>
    </div>
  );
}