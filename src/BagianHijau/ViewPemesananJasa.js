import React, { useEffect, useState } from "react";
import { fetchOrders } from "../controller/hijau";
import { deleteTestimoni } from "../controller/biru"; // Tambahkan API deleteTestimoni
import { useCookies } from "react-cookie";

const ViewPemesananJasa = () => {
  const [cookies] = useCookies(["userId"]); // Ambil userId dari cookies
  const [orders, setOrders] = useState([]); // State untuk menyimpan daftar pemesanan
  const [filteredOrders, setFilteredOrders] = useState([]); // Daftar pemesanan yang difilter
  const [filters, setFilters] = useState({ subkategori: "", status: "" }); // State filter
  const [loading, setLoading] = useState(true); // Status loading
  const [error, setError] = useState(null); // Status error

  // Fetch data pemesanan dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrders(cookies.userId);
        setOrders(data);
        setFilteredOrders(data); // Set default filtered orders
      } catch (error) {
        setError("Gagal memuat data pemesanan.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cookies.userId]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters
  const handleSearch = () => {
    let filtered = orders;
    if (filters.subkategori) {
      filtered = filtered.filter((order) =>
        order.subkategori.toLowerCase().includes(filters.subkategori.toLowerCase())
      );
    }
    if (filters.status) {
      filtered = filtered.filter((order) =>
        order.status.toLowerCase().includes(filters.status.toLowerCase())
      );
    }
    setFilteredOrders(filtered);
  };

  // Handle delete testimoni
  const handleDeleteTestimoni = async (order) => {
    try {
      const response = await deleteTestimoni(cookies.userId, order.id, new Date().toISOString()); // Panggil API delete testimoni
      alert(response); // Menampilkan pesan dari backend
      // Update status testimoni di UI
      const updatedOrders = orders.map((item) =>
        item.id === order.id ? { ...item, sudahMemberikanTestimoni: false } : item
      );
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus testimoni.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto mt-16 p-6">
      {/* Filter Section */}
      <div className="flex items-center gap-4 mb-6">
        <select
          name="subkategori"
          value={filters.subkategori}
          onChange={handleFilterChange}
          className="border p-2 rounded-md"
        >
          <option value="">Subkategori</option>
          {Array.from(new Set(orders.map((order) => order.subkategori))).map((subkategori) => (
            <option key={subkategori} value={subkategori}>
              {subkategori}
            </option>
          ))}
        </select>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border p-2 rounded-md"
        >
          <option value="">Status Pesanan</option>
          <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
          <option value="Mencari Pekerja Terdekat">Mencari Pekerja Terdekat</option>
          <option value="Pesanan Selesai">Pesanan Selesai</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Pesanan List */}
      <div className="space-y-4">
        {filteredOrders.map((pesanan, index) => (
          <div
            key={pesanan.id}
            className="flex items-center justify-between border p-4 rounded-lg"
          >
            {/* Informasi Pesanan */}
            <div className="flex flex-row gap-4 items-center w-full">
              <span className="w-1/6">{pesanan.subkategori}</span>
              <span className="w-1/6">{pesanan.sesiLayanan}</span>
              <span className="w-1/6">Rp {pesanan.harga.toLocaleString("id-ID")}</span>
              <span className="w-1/6">{pesanan.namaPekerja}</span>
              <span className="w-1/6">{pesanan.status}</span>

              {/* Conditional Buttons */}
              <div className="w-1/6">
                {pesanan.status === "Menunggu Pembayaran" ||
                  pesanan.status === "Mencari Pekerja Terdekat" ? (
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full">
                    Batalkan
                  </button>
                ) : pesanan.status === "Pesanan Selesai" &&
                  !pesanan.sudahMemberikanTestimoni ? (
                  <button
                    onClick={() => (window.location.href = `/testimoni/${pesanan.id}`)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full"
                  >
                    Buat Testimoni
                  </button>
                ) : pesanan.status === "Pesanan Selesai" &&
                  pesanan.sudahMemberikanTestimoni ? (
                  <button
                    onClick={() => handleDeleteTestimoni(pesanan)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full"
                  >
                    Hapus Testimoni
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewPemesananJasa;
