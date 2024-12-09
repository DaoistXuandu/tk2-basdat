import React, { useEffect, useState } from 'react';
import { createPesanan, fetchServiceSessions } from './controller/hijau'; // Import fungsi dari controller/hijau.js

const BookingForm = () => {
    const [sessions, setSessions] = useState([]);
    const [formData, setFormData] = useState({
        user_id: '', // Ambil dari autentikasi pengguna (misal melalui cookie)
        sesi_id: '',
        tanggal: '',
        diskon: '',
        metode_pembayaran: '',
        total: 0,
    });
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const data = await fetchServiceSessions(); // Ambil sesi layanan dari database
                setSessions(data);
            } catch (error) {
                setMessage('Gagal memuat sesi layanan.');
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSessionChange = (e) => {
        const selectedSession = sessions.find((session) => session.id === parseInt(e.target.value));
        setFormData((prevData) => ({
            ...prevData,
            sesi_id: selectedSession?.id || '',
            total: selectedSession?.price || 0, // Update total berdasarkan harga sesi
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPesanan(formData); // Kirim data ke backend
            setMessage('Pesanan berhasil dibuat!');
        } catch (error) {
            setMessage('Gagal membuat pesanan. Coba lagi nanti.');
        }
    };

    if (loading) return <div>Loading sesi layanan...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold text-center mb-6">Pesan Jasa</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Tanggal Pemesanan */}
                    <div className="flex justify-between items-center">
                        <label className="text-gray-600">Tanggal Pemesanan:</label>
                        <input
                            type="date"
                            name="tanggal"
                            className="border rounded-md px-3 py-2 w-60"
                            value={formData.tanggal}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Sesi Layanan */}
                    <div className="flex justify-between items-center">
                        <label className="text-gray-600">Sesi Layanan:</label>
                        <select
                            name="sesi_id"
                            className="border rounded-md px-3 py-2 w-60 bg-white"
                            value={formData.sesi_id}
                            onChange={handleSessionChange}
                            required
                        >
                            <option value="">Pilih Sesi</option>
                            {sessions.map((session) => (
                                <option key={session.id} value={session.id}>
                                    {session.name} - Rp {session.price.toLocaleString('id-ID')}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Diskon */}
                    <div className="flex justify-between items-center">
                        <label className="text-gray-600">Diskon:</label>
                        <input
                            type="text"
                            name="diskon"
                            placeholder="Kode Diskon"
                            className="border rounded-md px-3 py-2 w-60"
                            value={formData.diskon}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Total Pembayaran */}
                    <div className="flex justify-between items-center">
                        <label className="text-gray-600">Total Pembayaran:</label>
                        <input
                            type="text"
                            name="total"
                            className="border rounded-md px-3 py-2 w-60 bg-gray-50"
                            value={`Rp ${formData.total.toLocaleString('id-ID')},00`}
                            disabled
                        />
                    </div>

                    {/* Metode Pembayaran */}
                    <div className="flex justify-between items-center">
                        <label className="text-gray-600">Metode Pembayaran:</label>
                        <select
                            name="metode_pembayaran"
                            className="border rounded-md px-3 py-2 w-60 bg-white"
                            value={formData.metode_pembayaran}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Metode</option>
                            <option value="transfer">Transfer Bank</option>
                            <option value="ewallet">E-Wallet</option>
                            <option value="cash">Cash</option>
                        </select>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md mt-6 hover:bg-blue-700 transition-colors"
                    >
                        Pesan Jasa
                    </button>
                </form>

                {/* Pesan Notifikasi */}
                {message && (
                    <div className="mt-4 p-2 text-center rounded bg-blue-50 text-blue-700">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingForm;
