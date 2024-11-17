import React, { useState } from 'react';
import './TransaksiMyPay.css';
import User from "../components/user";
import NavBar from "../components/navbar";
const TransaksiMyPay = ({ role }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedServicePrice, setSelectedServicePrice] = useState(0);

  // Dummy data
  const userData = {
    name: "John Doe",
    balance: 1500000
  };

  const dummyServices = [
    { id: 1, name: "Jasa Laundry", price: 50000 },
    { id: 2, name: "Jasa Cleaning", price: 100000 },
    { id: 3, name: "Jasa Massage", price: 150000 }
  ];

  const banks = [
    "BCA",
    "Mandiri",
    "BNI",
    "BRI",
    "CIMB Niaga"
  ];

  // Format currency to IDR
  const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  // Handle service selection
  const handleServiceChange = (e) => {
    const serviceId = parseInt(e.target.value);
    if (serviceId) {
      const selectedService = dummyServices.find(service => service.id === serviceId);
      setSelectedServicePrice(selectedService ? selectedService.price : 0);
    } else {
      setSelectedServicePrice(0);
    }
  };

  const renderFormState = () => {
    switch (selectedCategory) {
      case 'topup':
        return (
          <div className="form-state">
            <h3>Top Up MyPay</h3>
            <div className="form-group">
              <label>Nominal:</label>
              <input type="number" placeholder="Masukkan nominal top up" />
              <button className="submit-button">Top Up</button>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="form-state">
            <h3>Pembayaran Jasa</h3>
            <div className="form-group">
              <label>Pesanan Jasa:</label>
              <select onChange={handleServiceChange}>
                <option value="">Pilih Jasa</option>
                {dummyServices.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {formatIDR(service.price)}
                  </option>
                ))}
              </select>
              <div className="price-display">
                Harga Jasa: {formatIDR(selectedServicePrice)}
              </div>
              <button className="submit-button">Bayar</button>
            </div>
          </div>
        );

      case 'transfer':
        return (
          <div className="form-state">
            <h3>Transfer MyPay</h3>
            <div className="form-group">
              <label>No. HP:</label>
              <input type="text" placeholder="Masukkan nomor HP tujuan" />
            </div>
            <div className="form-group">
              <label>Nominal:</label>
              <input type="number" placeholder="Masukkan nominal transfer" />
              <button className="submit-button">Bayar</button>
            </div>
          </div>
        );

      case 'withdrawal':
        return (
          <div className="form-state">
            <h3>Withdrawal</h3>
            <div className="form-group">
              <label>Nama Bank:</label>
              <select>
                <option value="">Pilih Bank</option>
                {banks.map((bank, index) => (
                  <option key={index} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>No. Rekening:</label>
              <input type="text" placeholder="Masukkan nomor rekening" />
            </div>
            <div className="form-group">
              <label>Nominal:</label>
              <input type="number" placeholder="Masukkan nominal withdrawal" />
              <button className="submit-button">Bayar</button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="transaction-container mt-16">
      <h2>Form Transaksi</h2>

      <div className="user-info">
        <p>Nama User: {userData.name}</p>
        <p>Saldo User: {formatIDR(userData.balance)}</p>
      </div>

      <div className="form-group">
        <label>Tanggal Transaksi:</label>
        <input type="date" />
      </div>

      <div className="form-group">
        <label>Kategori Transaksi:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Pilih Kategori</option>
          <option value="topup">Top Up MyPay</option>
          {/* Conditionally render Pembayaran Jasa if the role is Pengguna */}
          {role === "Pengguna" && (
            <option value="payment">Pembayaran Jasa</option>
          )}
          <option value="transfer">Transfer MyPay</option>
          <option value="withdrawal">Withdrawal</option>
        </select>
      </div>

      {renderFormState()}
    </div>
  );
};

export default TransaksiMyPay;