// src/components/PromoList.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { FaGift } from 'react-icons/fa';

const PromoList = ({ promos }) => {
  // Fungsi untuk memformat tanggal
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {promos.map((promo) => (
        <div key={promo.code} className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 flex items-center">
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

PromoList.propTypes = {
  promos: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      expiryDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PromoList;
