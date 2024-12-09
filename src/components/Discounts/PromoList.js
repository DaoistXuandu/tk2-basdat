import React, { useEffect, useState } from 'react';
import { FaGift } from 'react-icons/fa';
import { fetchDiskon } from '../../controller/biru'; // Pastikan path sesuai dengan lokasi file controller

const PromoList = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPromos = async () => {
      try {
        const data = await fetchDiskon(); // Gunakan fungsi fetchDiskon
        console.log('Data Promo:', data); // Debugging

        if (data && data.status && data.promo) {
          // Format data promo
          const formattedPromos = data.promo.map((promo) => ({
            code: promo.kode || 'Kode Tidak Tersedia',
            expiryDate: promo.tglAkhirBerlaku || 'Tanggal Tidak Tersedia',
          }));

          setPromos(formattedPromos);
        } else {
          setError('Gagal memuat data promo.');
        }
      } catch (err) {
        setError(`Terjadi kesalahan: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadPromos();
  }, []);

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal Tidak Tersedia';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
  };

  // Menampilkan loading dan error state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {promos.map((promo, index) => (
        <div
          key={index}
          className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 flex items-center"
        >
          <FaGift className="text-pink-500 text-2xl mr-4" />
          <div>
            <h4 className="text-xl font-bold text-pink-600">{promo.code}</h4>
            <p className="text-gray-600">Berlaku sampai: {formatDate(promo.expiryDate)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromoList;
