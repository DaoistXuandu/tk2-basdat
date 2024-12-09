import React, { useState, useEffect } from "react";
import "./StatusPekerjaanJasa.css";
import { getCurrentJob, updateCurrentJob } from "../controller/merah";
import { useCookies } from 'react-cookie'

const StatusPekerjaanJasa = () => {
  const [cookies] = useCookies(['userId', 'status', 'nama']);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [pesananList, setPesananList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPesanan, setFilteredPesanan] = useState([]);
  const [dummyPesanan, setDummyPesan] = useState([])

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
    "Pesanan Dibatal"
  ]

  const STATUS_MAP = {
    "": 0,
    "Menunggu Pekerja Berangkat": 3,
    "Pekerja Tiba Di Lokasi": 4,
    "Pelayanan Jasa Sedang Dilakukan": 5,
    "Pesanan Selesai": 6,
    "Pesanan Dibatal": 7
  }


  async function getData() {
    const data = await getCurrentJob(cookies.userId, STATUS_MAP[selectedStatus], searchQuery)
    if (data.status) {
      let current_value = []
      if (data.pekerjaan != null) {
        data.pekerjaan.map(item => {
          current_value.push({
            id: item.id,
            kategori: item.kategori,
            subkategori: item.subkategori,
            namaPelanggan: item.nama,
            tanggalPemesanan: item.tanggal,
            totalBiaya: item.total,
            sesi: item.sesi,
            status: STATUS_OPTIONS[item.status - 3]
          })
        })
      }
      setDummyPesan(current_value)
    }
  }

  useEffect(() => {
    getData()
  }, [cookies.userId])

  useEffect(() => {
    setPesananList(dummyPesanan);
    setFilteredPesanan(dummyPesanan);
  }, [dummyPesanan]);

  async function updateJob(id) {
    const data = await updateCurrentJob(id)
    alert(data.message)
  }

  const handleStatusChange = (pesananId, newStatus) => {
    updateJob(pesananId)
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
    getData()
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

  useEffect(() => {
    console.log(selectedStatus)
  }, [selectedStatus])

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
        {
          pesananList.length == 0 ? "Belum ada pekerjaan yang diambil" :
            (
              pesananList.map((pesanan) => (
                <div key={pesanan.id} className="pesanan-card">
                  <div className="pesanan-details">
                    <p>
                      <strong>{pesanan.subkategori}</strong> |{" "}
                      {pesanan.namaPelanggan}
                    </p>
                    <p>
                      Tgl Pemesanan:{" "}
                      {new Date(pesanan.tanggalPemesanan).toLocaleDateString("id-ID")}
                    </p>
                    <p>
                      Sesi:{" "}
                      {pesanan.sesi}
                    </p>
                    <p>
                      Status Pesanan:{" "}
                      {pesanan.status}
                    </p>

                  </div>
                  <div className="pesanan-action">
                    <p>Total: {formatCurrency(pesanan.totalBiaya)}</p>
                    {renderStatusButton(pesanan)}
                  </div>
                </div>
              ))
            )
        }
      </div>

    </div>
  );
};

export default StatusPekerjaanJasa;