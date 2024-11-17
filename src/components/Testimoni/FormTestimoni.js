// src/components/FormTestimoni.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';

const FormTestimoni = () => {
  const navigate = useNavigate();

  // State untuk input form
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');

  // Handler untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || message.trim() === '') {
      alert('Mohon isi rating dan komentar Anda.');
      return;
    }

    // Ambil testimonial yang sudah ada dari LocalStorage
    const storedTestimonis = JSON.parse(localStorage.getItem('testimonis')) || [];

    // Buat testimonial baru
    const newTestimoni = {
      name: 'Anda', // Anda bisa mengganti ini dengan nama pengguna yang sebenarnya
      rating,
      message,
    };

    // Tambahkan testimonial baru ke array
    const updatedTestimonis = [...storedTestimonis, newTestimoni];

    // Simpan ke LocalStorage
    localStorage.setItem('testimonis', JSON.stringify(updatedTestimonis));

    // Reset form
    setRating(0);
    setHoverRating(0);
    setMessage('');

    // Navigasi kembali ke halaman Testimoni
    navigate('/testimoni');
  };

  // Fungsi untuk merender bintang
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      if (i <= (hoverRating || rating)) {
        stars.push(
          <FaStar
            key={i}
            className="text-yellow-400 cursor-pointer"
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(i)}
          />
        );
      } else {
        stars.push(
          <FaRegStar
            key={i}
            className="text-yellow-400 cursor-pointer"
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(i)}
          />
        );
      }
    }
    return stars;
  };

  // Handler untuk membatalkan pengisian form
  const handleCancel = () => {
    // Reset form
    setRating(0);
    setHoverRating(0);
    setMessage('');

    // Navigasi kembali ke halaman Testimoni
    navigate('/testimoni');
  };

  return (
    <div className="container mx-auto p-6">
      <br></br>
      <br></br>
      <br></br>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Form Komentar</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Rating (1-10):</label>
            <div className="flex">
              {renderStars()}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Komentar:
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Tulis komentar Anda..."
              rows="4"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300 mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTestimoni;
