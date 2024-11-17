import React from 'react';

const BookingForm = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold text-center mb-6">Pesan Jasa</h2>

                <div className="space-y-4">
                    {/* Tanggal Pemesanan */}
                    <div className="flex justify-between items-center">
                        <label className="text-gray-600">Tanggal Pemesanan:</label>
                        <input
                            type="date"
                            className="border rounded-md px-3 py-2 w-60"
                            defaultValue="2024-11-17"
                        />
                    </div>

                    {/* Diskon */}
                    <div className="flex justify-between items-center">
                        <label className="text-gray-600">Diskon:</label>
                        <input
                            type="text"
                            placeholder="Kode Diskon"
                            className="border rounded-md px-3 py-2 w-60"
                            defaultValue="DISC20"
                        />
                    </div>

                    {/* Total Pembayaran */}
                    <div className="flex justify-between items-center">
                        <label className="text-gray-600">Total Pembayaran:</label>
                        <input
                            type="text"
                            className="border rounded-md px-3 py-2 w-60 bg-gray-50"
                            value="Rp 500.000,00"
                            disabled
                        />
                    </div>

                    {/* Metode Pembayaran */}
                    <div className="flex justify-between items-center">
                        <label className="text-gray-600">Metode Pembayaran:</label>
                        <select className="border rounded-md px-3 py-2 w-60 bg-white">
                            <option value="">Metode</option>
                            <option value="transfer">Transfer Bank</option>
                            <option value="ewallet">E-Wallet</option>
                            <option value="cash">Cash</option>
                        </select>
                    </div>

                    {/* Button */}
                    <button
                        className="w-full bg-blue-600 text-white py-2 rounded-md mt-6 hover:bg-blue-700 transition-colors"
                    >
                        Pesan Jasa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;