import React, { useState, useEffect } from "react";
import "./PekerjaanJasa.css";

const PekerjaanJasa = () => {
  const [selectedKategori, setSelectedKategori] = useState("");
  const [selectedSubkategori, setSelectedSubkategori] = useState("");
  const [availableSubkategori, setAvailableSubkategori] = useState([]);
  const [pesananList, setPesananList] = useState([]);
  const [allPesanan, setAllPesanan] = useState([
    {
      id: 1,
      kategori: "Home Cleaning",
      subkategori: "Daily Cleaning",
      namaPelanggan: "John Doe",
      tanggalPemesanan: "2024-03-20",
      tanggalPekerjaan: "2024-03-22",
      totalBiaya: 150000,
      status: "Mencari Pekerja Terdekat",
    },
    {
      id: 2,
      kategori: "Massage",
      subkategori: "Pijat Tradisional",
      namaPelanggan: "Asep",
      tanggalPemesanan: "2024-04-10",
      tanggalPekerjaan: "2024-05-02",
      totalBiaya: 200000,
      status: "Mencari Pekerja Terdekat",
    },
    {
      id: 3,
      kategori: "Massage",
      subkategori: "Refleksi",
      namaPelanggan: "Budi",
      tanggalPemesanan: "2024-10-10",
      tanggalPekerjaan: "2024-05-12",
      totalBiaya: 320000,
      status: "Mencari Pekerja Terdekat",
    },
    {
      id: 4,
      kategori: "Home Cleaning",
      subkategori: "Setrika",
      namaPelanggan: "Agus cuguy",
      tanggalPemesanan: "2024-11-10",
      tanggalPekerjaan: "2024-07-22",
      totalBiaya: 250000,
      status: "Mencari Pekerja Terdekat",
    },
    {
      id: 5,
      kategori: "Home Cleaning",
      subkategori: "Pembersihan Dapur",
      namaPelanggan: "Aguss guss",
      tanggalPemesanan: "2024-11-10",
      tanggalPekerjaan: "2024-07-22",
      totalBiaya: 250000,
      status: "Pesanan Selesai",
    },
  ]);

  const kategoriData = [
    {
      id: 1,
      name: "Home Cleaning",
      subkategori: ["Setrika", "Daily Cleaning", "Pembersihan Dapur"],
    },
    {
      id: 2,
      name: "Massage",
      subkategori: ["Pijat Tradisional", "Refleksi", "Sport Massage"],
    },
  ];

  // Load initial data when component mounts
  useEffect(() => {
    const initialPesanan = allPesanan.filter(
      (pesanan) => pesanan.status === "Mencari Pekerja Terdekat"
    );
    setPesananList(initialPesanan);
  }, []);

  const handleKategoriChange = (e) => {
    const selectedKategori = e.target.value;
    setSelectedKategori(selectedKategori);
    
    const kategori = kategoriData.find((k) => k.name === selectedKategori);
    setAvailableSubkategori(kategori ? kategori.subkategori : []);
    setSelectedSubkategori("");
  };

  const handleSearch = () => {
    let filteredPesanan = allPesanan.filter(
      (pesanan) => pesanan.status === "Mencari Pekerja Terdekat"
    );

    if (selectedKategori) {
      filteredPesanan = filteredPesanan.filter(
        (pesanan) => pesanan.kategori === selectedKategori
      );
    }

    if (selectedSubkategori) {
      filteredPesanan = filteredPesanan.filter(
        (pesanan) => pesanan.subkategori === selectedSubkategori
      );
    }

    setPesananList(filteredPesanan);
  };

  const handleKerjakanPesanan = (pesananId) => {
    setAllPesanan((prevList) =>
      prevList.map((pesanan) => {
        if (pesanan.id === pesananId) {
          return {
            ...pesanan,
            status: "Menunggu Pekerja Terdekat",
          };
        }
        return pesanan;
      })
    );

    // Update pesananList to remove the selected order
    setPesananList((prevList) =>
      prevList.filter((pesanan) => pesanan.id !== pesananId)
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div className="container">
      <div className="filter-section">
        <select value={selectedKategori} onChange={handleKategoriChange}>
          <option value="">Pilih Kategori</option>
          {kategoriData.map((kategori) => (
            <option key={kategori.id} value={kategori.name}>
              {kategori.name}
            </option>
          ))}
        </select>

        <select
          value={selectedSubkategori}
          onChange={(e) => setSelectedSubkategori(e.target.value)}
        >
          <option value="">Pilih Subkategori</option>
          {availableSubkategori.map((sub, index) => (
            <option key={index} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="pesanan-list">
        {pesananList.map((pesanan) => (
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
                Tgl Pekerjaan:{" "}
                {new Date(pesanan.tanggalPekerjaan).toLocaleDateString("id-ID")}
              </p>
            </div>
            <div className="pesanan-action">
              <p>Total: {formatCurrency(pesanan.totalBiaya)}</p>
              <button onClick={() => handleKerjakanPesanan(pesanan.id)}>
                Kerjakan Pesanan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PekerjaanJasa;