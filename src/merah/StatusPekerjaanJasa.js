import React, { useState, useEffect } from "react";
import "./StatusPekerjaanJasa.css";

const StatusPekerjaanJasa = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [pesananList, setPesananList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPesanan, setFilteredPesanan] = useState([]);

  // Define status flow as a constant
  const STATUS_FLOW = {
    "Menunggu Pekerja Berangkat": {
      next: "Pekerja Tiba Di Lokasi",
      buttonText: "Tiba Di Lokasi"
    },
    "Pekerja Tiba Di Lokasi": {
      next: "Pelayanan Jasa Sedang Dilakukan",
      buttonText: "Melakukan Pelayanan Jasa"
    },
    "Pelayanan Jasa Sedang Dilakukan": {
      next: "Pesanan Selesai",
      buttonText: "Selesai Melakukan Pelayanan"
    }
  };

  const STATUS_OPTIONS = [
    "Menunggu Pekerja Berangkat",
    "Pekerja Tiba Di Lokasi",
    "Pelayanan Jasa Sedang Dilakukan",
    "Pesanan Selesai",
    "Pesanan Dibatalkan"
  ];

  const dummyPesanan = [
    {
      id: 1,
      kategori: "Home Cleaning",
      subkategori: "Daily Cleaning",
      namaPelanggan: "John Doe",
      tanggalPemesanan: "2024-03-20",
      tanggalPekerjaan: "2024-03-22",
      totalBiaya: 150000,
      status: "Menunggu Pekerja Berangkat",
    },
    {
      id: 2,
      kategori: "Massage",
      subkategori: "Pijat Tradisional",
      namaPelanggan: "Asep",
      tanggalPemesanan: "2024-04-10",
      tanggalPekerjaan: "2024-05-02",
      totalBiaya: 200000,
      status: "Pekerja Tiba Di Lokasi",
    },
    {
      id: 3,
      kategori: "Massage",
      subkategori: "Refleksi",
      namaPelanggan: "Budi",
      tanggalPemesanan: "2024-10-10",
      tanggalPekerjaan: "2024-05-12",
      totalBiaya: 320000,
      status: "Pelayanan Jasa Sedang Dilakukan",
    },
    {
      id: 4,
      kategori: "Home Cleaning",
      subkategori: "Setrika",
      namaPelanggan: "Agus cuguy",
      tanggalPemesanan: "2024-11-10",
      tanggalPekerjaan: "2024-07-22",
      totalBiaya: 250000,
      status: "Pesanan Selesai",
    },
  ];

  useEffect(() => {
    setPesananList(dummyPesanan);
    setFilteredPesanan(dummyPesanan);
  }, []);

  const handleStatusChange = (pesananId, newStatus) => {
    const updatedList = pesananList.map((pesanan) => {
      if (pesanan.id === pesananId) {
        return {
          ...pesanan,
          status: newStatus,
        };
      }
      return pesanan;
    });
    
    setPesananList(updatedList);
    
    // Update filtered list immediately if no filters are active
    if (!selectedStatus && !searchQuery) {
      setFilteredPesanan(updatedList);
    } else {
      // Re-apply current filters to the updated list
      handleSearch(updatedList);
    }
  };

  const handleSearch = (currentList = pesananList) => {
    const filtered = currentList.filter((pesanan) => {
      const statusMatch = !selectedStatus || pesanan.status === selectedStatus;
      const queryMatch = !searchQuery || 
        pesanan.subkategori.toLowerCase().includes(searchQuery.toLowerCase());
      
      return statusMatch && queryMatch;
    });

    setFilteredPesanan(filtered);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStatusButton = (pesanan) => {
    const statusConfig = STATUS_FLOW[pesanan.status];
    if (!statusConfig) return null;

    return (
      <button 
        onClick={() => handleStatusChange(pesanan.id, statusConfig.next)}
        className="status-button"
      >
        {statusConfig.buttonText}
      </button>
    );
  };

  return (
    <div className="container">
      <div className="filter-section">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="status-select"
        >
          <option value="">Semua Status</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari Subkategori..."
          className="search-input"
        />

        <button onClick={() => handleSearch()} className="search-button">
          Search
        </button>
      </div>

      <div className="pesanan-list">
        {filteredPesanan.map((pesanan) => (
          <div key={pesanan.id} className="pesanan-card">
            <div className="pesanan-details">
              <p className="pesanan-header">
                <strong>{pesanan.subkategori}</strong> | {pesanan.namaPelanggan}
              </p>
              <p>Tgl Pemesanan: {formatDate(pesanan.tanggalPemesanan)}</p>
              <p>Tgl Pekerjaan: {formatDate(pesanan.tanggalPekerjaan)}</p>
              <p className="pesanan-status">Status: {pesanan.status}</p>
            </div>
            <div className="pesanan-action">
              <p className="pesanan-total">
                Total: {formatCurrency(pesanan.totalBiaya)}
              </p>
              {renderStatusButton(pesanan)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusPekerjaanJasa;