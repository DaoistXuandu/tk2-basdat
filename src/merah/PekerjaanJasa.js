import React, { useState, useEffect } from "react";
import "./PekerjaanJasa.css";
import { getJobForPekerja, getKategoriAndSub, updateJobForPekerja } from "../controller/merah";
import { useCookies } from 'react-cookie'

const PekerjaanJasa = () => {
  const [cookies] = useCookies(['userId', 'status', 'nama']);
  const [selectedKategori, setSelectedKategori] = useState("");
  const [selectedSubkategori, setSelectedSubkategori] = useState("");
  const [availableSubkategori, setAvailableSubkategori] = useState([]);
  const [pesananList, setPesananList] = useState([]);
  const [kategoriData, setKategoriData] = useState([])
  const [allPesanan, setAllPesanan] = useState([])

  async function getInitialValue() {
    let data = await getKategoriAndSub(cookies.userId);
    if (data.status) {
      const current_value = []

      data.kategori.map((input, index) => {
        current_value.push({
          name: input,
          subkategori: data.subkategori[index]
        })
      })
      setKategoriData(current_value)
    }
    else {
      alert(data.message)
    }

    data = await getJobForPekerja(cookies.userId);
    if (data.status) {
      const current_value = []
      data.pesanan.map((input) => {
        current_value.push({
          id: input.id,
          kategori: input.kategori,
          subkategori: input.subkategori,
          namaPelanggan: input.nama,
          tanggalPemesanan: input.tanggal,
          totalBiaya: input.total,
          sesi: input.sesi,
          status: "Mencari Pekerja Terdekat"
        })
      })
      setAllPesanan(current_value)
    }
    else {
      alert(data.message)
    }
  }

  // Load initial data when component mounts
  useEffect(() => {
    getInitialValue()
  }, []);

  useEffect(() => {
    const initialPesanan = allPesanan.filter(
      (pesanan) => pesanan.status === "Mencari Pekerja Terdekat"
    );
    setPesananList(initialPesanan);
  }, [allPesanan])

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

  async function updateJob(pesananId) {
    const data = await updateJobForPekerja(cookies.userId, pesananId)
    alert(data.message)
  }

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

    updateJob(pesananId)
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
                Sesi:{" "}
                {pesanan.sesi}
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