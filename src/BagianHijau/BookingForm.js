import React, { useState } from 'react';

// Booking Form Component
const BookingForm = ({ session, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        promoCode: '',
        paymentMethod: 'myPay'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Book Service</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Booking Date</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Promo Code</label>
                        <input
                            type="text"
                            value={formData.promoCode}
                            onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                            className="w-full p-2 border rounded"
                            placeholder="Enter promo code (optional)"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Payment Method</label>
                        <select
                            value={formData.paymentMethod}
                            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="myPay">MyPay</option>
                            <option value="bankTransfer">Bank Transfer</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <p className="font-medium">Total Payment</p>
                        <p className="text-xl">Rp {session.price.toLocaleString()}</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Confirm Booking
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;