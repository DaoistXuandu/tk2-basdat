import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle, FaTimesCircle, FaTag } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import { buyVoucher } from '../../controller/biru'; // Import fungsi buyVoucher dari controller

const VoucherList = ({ vouchers }) => {
  const [modal, setModal] = useState({
    isVisible: false,
    title: '',
    message: '',
  });
  const [loadingVoucher, setLoadingVoucher] = useState(null);
  const [cookies] = useCookies(['status', 'userId']);
  const userId = cookies.userId;
  const userStatus = cookies.status;

  // Fungsi untuk memformat angka menjadi format uang
  const formatCurrency = (price) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);

  // Fungsi untuk menangani pembelian voucher
  const handleBuyVoucher = async (voucherCode) => {
    if (userStatus !== 'Pengguna') {
      setModal({
        isVisible: true,
        title: 'Akses Ditolak',
        message: 'Hanya pengguna dengan status "Pengguna" yang dapat membeli voucher.',
      });
      return;
    }

    setLoadingVoucher(voucherCode); // Menandai voucher sedang diproses
    try {
      const response = await buyVoucher(userId, voucherCode); // Panggil fungsi buyVoucher
      if (response.status) {
        setModal({
          isVisible: true,
          title: 'SUKSES',
          message: `Selamat! Anda berhasil membeli voucher dengan kode ${voucherCode}.`,
        });
      } else {
        setModal({
          isVisible: true,
          title: 'GAGAL',
          message: response.message,
        });
      }
    } catch (error) {
      setModal({
        isVisible: true,
        title: 'ERROR',
        message: 'Terjadi kesalahan dalam proses pembelian voucher.',
      });
      console.error(error);
    } finally {
      setLoadingVoucher(null); // Reset loading state
    }
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setModal({ ...modal, isVisible: false });
  };

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vouchers.map((voucher) => (
          <div
            key={voucher.kode}
            className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <FaTag className="text-indigo-500 text-2xl mr-2" />
              <h4 className="text-xl font-bold text-indigo-600">{voucher.kode}</h4>
            </div>
            <p className="text-green-500 font-semibold text-lg">
              Potongan: {formatCurrency(voucher.potongan)}
            </p>
            <p className="text-gray-600">Min Transaksi: {formatCurrency(voucher.minTrPemesanan)}</p>
            <p className="text-gray-600">Berlaku: {voucher.jmlHariBerlaku} hari</p>
            <p className="text-gray-600">Kuota: {voucher.kuotaPenggunaan} kali</p>
            <p className="text-lg font-semibold text-red-500">Harga: {formatCurrency(voucher.harga)}</p>
            <button
              onClick={() => handleBuyVoucher(voucher.kode)}
              disabled={loadingVoucher === voucher.kode || userStatus !== 'Pengguna'}
              className={`mt-4 w-full px-4 py-2 rounded flex items-center justify-center transition-colors duration-300 ${
                loadingVoucher === voucher.kode
                  ? 'bg-gray-400 text-gray-700'
                  : userStatus !== 'Pengguna'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {loadingVoucher === voucher.kode ? (
                <span>Loading...</span>
              ) : (
                <>
                  <FaCheckCircle className="mr-2" />
                  {userStatus !== 'Pengguna' ? 'Tidak Tersedia' : 'Beli'}
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal.isVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <div className="flex items-center mb-4">
              {modal.title === 'SUKSES' ? (
                <FaCheckCircle className="text-green-500 text-3xl mr-2" />
              ) : (
                <FaTimesCircle className="text-red-500 text-3xl mr-2" />
              )}
              <h2 className="text-2xl font-bold">{modal.title}</h2>
            </div>
            <p className="mb-6">{modal.message}</p>
            <button
              onClick={closeModal}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

VoucherList.propTypes = {
  vouchers: PropTypes.arrayOf(
    PropTypes.shape({
      kode: PropTypes.string.isRequired,
      potongan: PropTypes.number.isRequired,
      minTrPemesanan: PropTypes.number.isRequired,
      jmlHariBerlaku: PropTypes.number.isRequired,
      kuotaPenggunaan: PropTypes.number.isRequired,
      harga: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default VoucherList;
