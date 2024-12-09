import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import { createTestimoni } from '../../controller/biru';

const FormTestimoni = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies(['userId']);
  const userId = cookies.userId;

  // Pastikan `pemesananId` diambil dari query parameter atau lokasi lainnya
  const pemesananId = location.state?.pemesananId || '';

  // State untuk input form
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || message.trim() === '') {
      alert('Mohon isi rating dan komentar Anda.');
      return;
    }
    if (!pemesananId) {
      alert('Pemesanan ID tidak tersedia.');
      return;
    }

    setLoading(true);

    try {
      const response = await createTestimoni(userId, pemesananId, message.trim(), rating);
      alert(`Testimoni berhasil dibuat: ${response}`);
      // Reset form
      setRating(0);
      setHoverRating(0);
      setMessage('');
      // Navigasi kembali ke halaman Testimoni
      navigate('/testimoni');
    } catch (error) {
      alert('Terjadi kesalahan saat membuat testimoni. Silakan coba lagi.');
      console.error(error);
    } finally {
      setLoading(false);
    }
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
    // Navigasi ke halaman View Pemesanan Jasa
    navigate('/viewPemesananJasa');
  };

  return (
    <div className="container mx-auto p-6">
      <br />
      <br />
      <br />
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Form Komentar</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Rating (1-10):</label>
            <div className="flex">{renderStars()}</div>
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
              disabled={loading}
              className={`px-4 py-2 rounded ${
                loading
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 transition-colors duration-300'
              }`}
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300 ml-2"
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
