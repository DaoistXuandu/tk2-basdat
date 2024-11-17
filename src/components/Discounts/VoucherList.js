// src/components/VoucherList.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle, FaTimesCircle, FaTag } from 'react-icons/fa';

const VoucherList = ({ vouchers }) => {
  const [modal, setModal] = useState({
    isVisible: false,
    title: '',
    message: '',
  });

  // Fungsi untuk memformat angka menjadi format uang
  const formatCurrency = (priceString) => {
    const number = parseInt(priceString.replace(/[^0-9]/g, ''), 10);
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };

  // Fungsi untuk menangani pembelian voucher
  const handleBuyVoucher = (voucher) => {
    const voucherPrice = parseInt(voucher.price.replace(/[^0-9]/g, ''), 10);

    // Simulasi saldo pengguna
    const userBalance = 10000; // Anda dapat menggantinya dengan saldo aktual pengguna

    if (userBalance >= voucherPrice) {
      setModal({
        isVisible: true,
        title: 'SUKSES',
        message: `Selamat! Anda berhasil membeli voucher kode ${voucher.code}. Voucher ini akan berlaku hingga tanggal XX/XX/XXXX dengan kuota penggunaan sebanyak ${voucher.usageQuota} kali.`,
      });
      // Implementasikan logika pengurangan saldo dan pembelian voucher di sini
    } else {
      setModal({
        isVisible: true,
        title: 'GAGAL',
        message: 'Maaf, saldo Anda tidak cukup untuk membeli voucher ini.',
      });
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
          <div key={voucher.code} className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <FaTag className="text-indigo-500 text-2xl mr-2" />
              <h4 className="text-xl font-bold text-indigo-600">{voucher.code}</h4>
            </div>
            <p className="text-green-500 font-semibold text-lg">{voucher.discount} OFF</p>
            <p className="text-gray-600">Min Transaksi: {voucher.minTransaction}</p>
            <p className="text-gray-600">Berlaku: {voucher.validDays} hari</p>
            <p className="text-gray-600">Kuota: {voucher.usageQuota} kali</p>
            <p className="text-lg font-semibold text-red-500">Harga: {formatCurrency(voucher.price)}</p>
            <button
              onClick={() => handleBuyVoucher(voucher)}
              className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center justify-center transition-colors duration-300"
            >
              <FaCheckCircle className="mr-2" />
              Beli
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal.isVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          aria-labelledby="modal-title"
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
              <h2 id="modal-title" className="text-2xl font-bold">
                {modal.title}
              </h2>
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
      code: PropTypes.string.isRequired,
      discount: PropTypes.string.isRequired,
      minTransaction: PropTypes.string.isRequired,
      validDays: PropTypes.string.isRequired,
      usageQuota: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default VoucherList;
