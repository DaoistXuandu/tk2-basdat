import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { FaTag, FaGift } from 'react-icons/fa';
import VoucherList from './VoucherList';
import PromoList from './PromoList';
import { fetchDiskon } from '../../controller/biru';

const DiscountPage = () => {
    const [cookies] = useCookies(['userId']);
    const [vouchers, setVouchers] = useState([]);
    const [promos, setPromos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDiscountData = async () => {
            try {
                const data = await fetchDiskon();
                console.log("Fetched data:", data);

                if (data && data.status) {
                    const formattedVouchers = data.voucher.map((v) => ({
                        kode: v.kode,
                        potongan: v.potongan,
                        minTrPemesanan: v.minTrPemesanan,
                        jmlHariBerlaku: v.jmlHariBerlaku,
                        kuotaPenggunaan: v.kuotaPenggunaan,
                        harga: v.harga,
                    }));

                    const formattedPromos = data.promo.map((p) => ({
                        kode: p.kode,
                        tglAkhirBerlaku: p.tglAkhirBerlaku,
                    }));

                    setVouchers(formattedVouchers);
                    setPromos(formattedPromos);
                } else {
                    setError('Gagal memuat data diskon.');
                }
            } catch (err) {
                setError(`Terjadi kesalahan: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        loadDiscountData();
    }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <br />
      <br />
      <br />
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg shadow-xl">
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 flex items-center justify-center space-x-2 mb-8">
          <FaTag className="text-indigo-500" />
          <span>DISKON</span>
        </h2>

        <div className="space-y-12">
          {/* Voucher Section */}
          <section aria-labelledby="voucher-section">
            <div className="flex items-center space-x-2 mb-6">
              <FaTag className="text-green-500 text-2xl" />
              <h3 id="voucher-section" className="text-3xl font-semibold text-gray-800">
                Voucher
              </h3>
            </div>
            <VoucherList vouchers={vouchers} />
          </section>

          {/* Separator */}
          <hr className="border-gray-300" />

          {/* Promo Section */}
          <section aria-labelledby="promo-section">
            <div className="flex items-center space-x-2 mb-6">
              <FaGift className="text-pink-500 text-2xl" />
              <h3 id="promo-section" className="text-3xl font-semibold text-gray-800">
                Promo
              </h3>
            </div>
            <PromoList promos={promos} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default DiscountPage;
