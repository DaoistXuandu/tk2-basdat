// src/components/DiscountPage.jsx

import React from 'react';
import { FaTag, FaGift } from 'react-icons/fa';
import VoucherList from './VoucherList';
import PromoList from './PromoList';
// import Testimoni from './Testimoni';

const discounts = {
  vouchers: [
    {
      code: 'VOUCHER10',
      discount: '10%',
      minTransaction: 'Rp 50,000',
      validDays: '30',
      usageQuota: '100',
      price: 'Rp 5,000',
    },
    {
      code: 'VOUCHER20',
      discount: '20%',
      minTransaction: 'Rp 100,000',
      validDays: '15',
      usageQuota: '50',
      price: 'Rp 10,000',
    },
    {
      code: 'VOUCHER30',
      discount: '30%',
      minTransaction: 'Rp 150,000',
      validDays: '7',
      usageQuota: '20',
      price: 'Rp 15,000',
    },
  ],
  promos: [
    {
      code: 'PROMO1',
      expiryDate: '2024-12-31',
    },
    {
      code: 'PROMO2',
      expiryDate: '2024-11-30',
    },
    {
      code: 'PROMO3',
      expiryDate: '2024-10-15',
    },
  ],
  testimonis: [
    {
      name: 'Ahmad',
      message: 'Voucher ini sangat membantu dalam belanja saya!',
    },
    {
      name: 'Siti',
      message: 'Promo yang menarik dan mudah digunakan.',
    },
    {
      name: 'Budi',
      message: 'Layanan pelanggan yang luar biasa.',
    },
  ],
};

const DiscountPage = () => {
  return (
    <div className="container mx-auto p-6">
      <br></br>
      <br></br>
      <br></br>
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
            <VoucherList vouchers={discounts.vouchers} />
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
            <PromoList promos={discounts.promos} />
          </section>

          {/* Separator
          <hr className="border-gray-300" /> */}

          {/* Testimoni Section
          <section aria-labelledby="testimoni-section">
            <div className="flex items-center space-x-2 mb-6">
              <FaTag className="text-yellow-500 text-2xl" />
              <h3 id="testimoni-section" className="text-3xl font-semibold text-gray-800">
                Testimoni
              </h3>
            </div>
            <Testimoni testimonis={discounts.testimonis} />
          </section> */}
        </div>
      </div>
    </div>
  );
};

export default DiscountPage;
