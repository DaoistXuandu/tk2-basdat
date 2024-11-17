import React from 'react';
import { Star } from 'lucide-react';

const SubCategoryDetail = () => {
    // Dummy data
    const subcategoryData = {
        name: "Tata Rias Pengantin",
        category: "Makeup & Kecantikan",
        description: "Layanan makeup profesional untuk pengantin dengan pengalaman lebih dari 10 tahun. Menggunakan produk premium dan tahan lama untuk hari spesial Anda.",
        services: [
            { name: "Paket Makeup Pengantin Basic", price: "Rp 2.500.000" },
            { name: "Paket Makeup Pengantin Premium", price: "Rp 4.500.000" }
        ],
        workers: [
            { name: "Sarah Amelia", rating: 4.8 },
            { name: "Linda Wijaya", rating: 4.9 },
            { name: "Nina Hartono", rating: 4.7 },
            { name: "Maria Chen", rating: 4.8 }
        ],
        testimonials: [
            {
                name: "Jessica Rahman",
                date: "15 Nov 2024",
                text: "Sangat puas dengan hasil makeupnya. Tahan lama dan natural!",
                workerName: "Sarah Amelia",
                rating: 5
            }
        ]
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                {/* Header Section */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={subcategoryData.name}
                        className="border rounded-md p-2"
                        readOnly
                    />
                    <input
                        type="text"
                        value={subcategoryData.category}
                        className="border rounded-md p-2"
                        readOnly
                    />
                </div>

                {/* Description */}
                <textarea
                    value={subcategoryData.description}
                    className="w-full border rounded-md p-3 h-24"
                    readOnly
                />

                {/* Service Sessions */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Pilihan Sesi Layanan</h3>
                    {subcategoryData.services.map((service, index) => (
                        <div key={index} className="flex items-center justify-between border rounded-md p-4">
                            <div className="flex-1">
                                <span className="font-medium">{service.name}</span>
                                <span className="ml-4 text-gray-600">{service.price}</span>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Pesan
                            </button>
                        </div>
                    ))}
                </div>

                {/* Workers */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Pekerja</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {subcategoryData.workers.map((worker, index) => (
                            <div key={index} className="border rounded-md p-3 text-center">
                                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2" />
                                <p className="font-medium">{worker.name}</p>
                                <div className="flex items-center justify-center text-yellow-500">
                                    <Star size={16} fill="currentColor" />
                                    <span className="ml-1">{worker.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Join Button (only shown in worker view) */}
                <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700">
                    Bergabung
                </button>

                {/* Testimonials */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Testimoni</h3>
                    {subcategoryData.testimonials.map((testimonial, index) => (
                        <div key={index} className="border rounded-md p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-medium">{testimonial.name}</p>
                                    <p className="text-gray-600 text-sm">{testimonial.text}</p>
                                </div>
                                <span className="text-sm text-gray-500">{testimonial.date}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm text-gray-600">{testimonial.workerName}</span>
                                <div className="flex items-center text-yellow-500">
                                    <Star size={16} fill="currentColor" />
                                    <span className="ml-1">{testimonial.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubCategoryDetail;