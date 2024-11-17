import React from "react";

const ViewPemesananJasa = () => {
  // Data dummy untuk pemesanan jasa
  const pesananData = [
    {
      subkategori: "Tata Rias Pengantin",
      sesiLayanan: "Paket Premium",
      harga: "Rp 4.500.000",
      namaPekerja: "Sarah Amelia",
      status: "Menunggu Pembayaran",
    },
    {
      subkategori: "Fotografi Pernikahan",
      sesiLayanan: "Full Day",
      harga: "Rp 6.000.000",
      namaPekerja: "John Doe",
      status: "Pesanan Selesai",
      sudahMemberikanTestimoni: false,
    },
    {
      subkategori: "Dekorasi Pernikahan",
      sesiLayanan: "Paket Standard",
      harga: "Rp 12.000.000",
      namaPekerja: "Maria Chen",
      status: "Diproses",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-16 p-6">
      {/* Filter Section */}
      <div className="flex items-center gap-4 mb-6">
        <select className="border p-2 rounded-md">
          <option>Subkategori</option>
          <option>Tata Rias Pengantin</option>
          <option>Fotografi Pernikahan</option>
          <option>Dekorasi Pernikahan</option>
        </select>
        <select className="border p-2 rounded-md">
          <option>Status Pesanan</option>
          <option>Menunggu Pembayaran</option>
          <option>Mencari Pekerja Terdekat</option>
          <option>Pesanan Selesai</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Search
        </button>
      </div>

      {/* Pesanan List */}
      <div className="space-y-4">
        {pesananData.map((pesanan, index) => (
          <div
            key={index}
            className="flex items-center justify-between border p-4 rounded-lg"
          >
            {/* Informasi Pesanan */}
            <div className="flex flex-row  gap-4 items-center w-full">
              <span className="w-1/6">{pesanan.subkategori}</span>
              <span className="w-1/6">{pesanan.sesiLayanan}</span>
              <span className="w-1/6">{pesanan.harga}</span>
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
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full">
                    Buat Testimoni
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
