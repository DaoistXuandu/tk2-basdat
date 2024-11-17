// src/components/Testimoni.jsx

import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaUserCircle } from 'react-icons/fa';

const Testimoni = () => {
  // State untuk daftar testimonial
  const [testimonis, setTestimonis] = useState([]);

  // Mengambil testimonial dari LocalStorage saat komponen dimount
  useEffect(() => {
    const storedTestimonis = JSON.parse(localStorage.getItem('testimonis'));
    if (storedTestimonis && storedTestimonis.length > 0) {
      setTestimonis(storedTestimonis);
    } else {
      // Data dummy jika tidak ada testimonial di LocalStorage
      setTestimonis([
        {
          name: 'Ahmad',
          rating: 8,
          message: 'Layanan yang sangat memuaskan dan profesional!',
        },
        {
          name: 'Siti',
          rating: 9,
          message: 'Proses cepat dan hasilnya luar biasa.',
        },
        {
          name: 'Budi',
          rating: 7,
          message: 'Kualitas baik, tetapi pengiriman agak lambat.',
        },
      ]);
    }
  }, []);

  return (
    <div className="container mx-auto p-6">
      <br></br>
      <br></br>
      <br></br>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Testimoni Pelanggan</h2>

        {/* Daftar Testimonial */}
        <div className="space-y-6">
          {testimonis.length > 0 ? (
            testimonis.map((testimoni, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FaUserCircle className="text-indigo-500 text-3xl mr-4" />
                  <span className="font-semibold text-gray-800">{testimoni.name}</span>
                  <div className="flex ml-4">
                    {[...Array(10)].map((star, i) => {
                      const ratingValue = i + 1;
                      return (
                        <span key={i}>
                          {ratingValue <= testimoni.rating ? (
                            <FaStar className="text-yellow-400" />
                          ) : (
                            <FaRegStar className="text-yellow-400" />
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimoni.message}"</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700">Belum ada testimoni.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimoni;
