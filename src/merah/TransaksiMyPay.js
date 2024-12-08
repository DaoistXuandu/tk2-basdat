import React, { useState } from 'react';
import './TransaksiMyPay.css';
import { useEffect } from "react";
import { useCookies } from 'react-cookie'
import { topUpMyPayBalance, getCategoryIdByName, getPesananJasa, getMyPayBalance, processPayment, transferToAnotherUser, withdrawUserMoney } from "../controller/merah";

export default function TransaksiMyPay() {
  const [cookies] = useCookies(['userId', 'status', 'name']);
  const [userData, setUserData] = useState({
    name: '',
    balance: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedServicePrice, setSelectedServicePrice] = useState(0);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [wait, setWait] = useState(false);
  const [date, setDate] = useState("");
  const [services, setServices] = useState([]); // Untuk menyimpan pesanan jasa
  const [selectedServiceId, setSelectedServiceId] = useState(null); // Untuk menyimpan ID jasa yang dipilih
  const [tfAmount, setTfAmount] = useState(0)
  const [tfHp, setTfHp] = useState(0)
  const [withdrawal, setWithdrawal] = useState(0)

  // Function to handle top-up input changes
  const handleAmountChange = (e) => {
    setTopUpAmount(e.target.value);
  };

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

  /// Handle service selection
  const handleServiceChange = (e) => {
    const serviceId = e.target.value;
    setSelectedServiceId(serviceId);

    const selectedService = services.find(service => service.id === serviceId);
    setSelectedServicePrice(selectedService ? selectedService.total_biaya : 0);
  };

  async function fetchData() {
    try {
      const userId = cookies.userId;
      const balanceData = await getMyPayBalance(userId, cookies.status === 'Pengguna' ? 0 : 1);
      if (balanceData) {
        setUserData({
          name: cookies.name || '',
          balance: balanceData.balance,
        });
      }

      // Ambil daftar pesanan jasa untuk pengguna
      const ordersData = await getPesananJasa(userId);
      if (ordersData.status) {
        setServices(ordersData.pesanan); // Menyimpan data layanan yang dipesan
      }
      console.log(ordersData)

    } catch (error) {
      console.error('Error fetching balance:', error.message);
    }
  }

  // Fetch user balance on mount
  useEffect(() => {
    fetchData();
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
    console.log(cookies.userId)
  }, [cookies.userId, cookies.nama, cookies.status]);

  // Handle Top-Up submission
  async function handleTopUpSubmit(e) {
    e.preventDefault();

    if (!topUpAmount || parseInt(topUpAmount) <= 0) {
      alert('Nominal top-up harus lebih besar dari 0.');
      return;
    }

    try {
      const userId = cookies.userId;
      const kategoriId = await getCategoryIdByName('topup');

      if (!kategoriId) {
        alert('Kategori tidak ditemukan.');
        return;
      }

      const response = await topUpMyPayBalance(userId, parseInt(topUpAmount), kategoriId);
      if (response.status) {
        alert("Top Up Berhasil")
        setTopUpAmount(''); // Reset input

        // Fetch the updated balance
        const balanceData = await getMyPayBalance(userId, cookies.status === 'Pengguna' ? 0 : 1);
        if (balanceData) {
          setUserData({
            name: cookies.nama || '',
            balance: balanceData.balance,
          });
        }
      } else {
        alert(response.message || 'Gagal melakukan top-up.');
      }
    } catch (error) {
      alert('Gagal melakukan top-up.');
    }
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setWait()
    // Validasi jika tidak ada jasa yang dipilih
    if (!selectedServiceId) {
      alert('Silakan pilih jasa untuk pembayaran.');
      return;
    }

    try {
      const userId = cookies.userId;

      // Kirim request pembayaran
      const response = await processPayment(userId, selectedServiceId);

      // Menangani respon dari server
      if (!response.status) {
        alert(response.message);
      } else {
        alert('Pembayaran berhasil dilakukan');

        // Fetch balance terbaru setelah pembayaran
        const balanceData = await getMyPayBalance(userId, cookies.status === 'Pengguna' ? 0 : 1);
        if (balanceData) {
          setUserData((prevData) => ({
            ...prevData,
            balance: balanceData.balance,
          }));
        }
      }
    } catch (error) {
      // Tangani error apabila ada
      alert('Terjadi kesalahan saat memproses pembayaran.');
    }
  };

  async function handleTransfer(e) {
    e.preventDefault()

    if (tfAmount == 0 || tfHp <= 0) {
      alert("Nominal dan No Hp tidak boleh kosong dan harus merupakan bilangan positif")
      return
    }

    let hp = tfHp.toString()
    let amount = tfAmount
    hp = (hp[0] == '0' ? hp.substring(1, hp.length) : hp)
    if (hp.length > 2) {
      hp = (hp[hp.length - 2] == '.' ? hp : hp + '.0')
    }

    try {
      amount = parseFloat(tfAmount)
    }
    catch (err) {
      alert("Nominal harus merupakan bilangan positif")
      return
    }

    const data = await transferToAnotherUser(cookies.userId, amount, hp)
    alert(data.message)
    fetchData()
  }

  async function handleWithdrawal(e) {
    e.preventDefault()

    if (withdrawal <= 0) {
      alert("Nominal harus lebih dari 0")
      return
    }

    let amount = withdrawal
    try {
      amount = parseFloat(amount)
    }
    catch (err) {
      alert("Nonimal harusliah bilangan positif");
      return;
    }

    const data = await withdrawUserMoney(cookies.userId, amount)
    alert(data.message)
    fetchData()
  }


  const renderFormState = () => {
    switch (selectedCategory) {
      case 'topup':
        return (
          <div className="form-state">
            <h3>Top Up MyPay</h3>
            <div className="form-group">
              <label>Nominal:</label>
              <input
                type="number"
                value={topUpAmount}
                onChange={handleAmountChange}
                placeholder="Masukkan nominal top up" />
              <button
                onClick={handleTopUpSubmit}
                disabled={wait}
                className="submit-button"
              >
                Top Up
              </button>
            </div>
          </div>
        );

      case 'payment':
        return (
          <form className="form-state">
            <h3>Pembayaran Jasa</h3>
            <div className="form-group">
              <label>Pesanan Jasa:</label>
              <select onChange={handleServiceChange} value={selectedServiceId}>
                <option value="">Pilih Jasa</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.nama_jasa} (Sesi: {service.sesi}) - {formatIDR(service.total_biaya)}
                  </option>
                ))}
              </select>
              <div className="price-display">
                Harga Jasa: {formatIDR(selectedServicePrice)}
              </div>
              <button
                className="submit-button"
                onClick={handlePaymentSubmit}
                disabled={wait}
              >
                {wait ? 'Memproses...' : 'Bayar'}
              </button>
            </div>
          </form>
        );

      case 'transfer':
        return (
          <form className="form-state">
            <h3>Transfer MyPay</h3>
            <div className="form-group">
              <label>No. HP:</label>
              <input value={tfHp} onChange={e => setTfHp(e.target.value)} type="number" placeholder="Masukkan nomor HP tujuan" />
            </div>
            <div className="form-group">
              <label>Nominal:</label>
              <input value={tfAmount} onChange={e => setTfAmount(e.target.value)} type="number" placeholder="Masukkan nominal transfer" />
              <button className="submit-button" onClick={e => handleTransfer(e)}>Bayar</button>
            </div>
          </form>
        );

      case 'withdrawal':
        return (
          <form className="form-state">
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
              <input type="number" placeholder="Masukkan nominal withdrawal" value={withdrawal} onChange={e => setWithdrawal(e.target.value)} />
              <button className="submit-button" onClick={e => handleWithdrawal(e)}>Bayar</button>
            </div>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="transaction-container">
      <h2>Form Transaksi</h2>

      <div className="user-info">
        <p>Nama User: {userData.name}</p>
        <p>Saldo User: {formatIDR(userData.balance)}</p>
      </div>

      <div className="form-group">
        <label>Tanggal Transaksi:</label>
        <span>{date}</span>
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
          {cookies.status === "Pengguna" && (
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
