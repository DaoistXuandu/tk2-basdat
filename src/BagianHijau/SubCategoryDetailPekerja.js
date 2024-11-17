import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { FaUserCircle, FaStar, FaRegStar } from "react-icons/fa";

const SubCategoryDetail = () => {
    const [testimonis, setTestimonis] = useState([]);

    // Mengambil testimonial dari LocalStorage saat komponen dimount
    useEffect(() => {
        const storedTestimonis = JSON.parse(localStorage.getItem("testimonis"));
        if (storedTestimonis && storedTestimonis.length > 0) {
            setTestimonis(storedTestimonis);
        } else {
            // Data dummy jika tidak ada testimonial di LocalStorage
            setTestimonis([
                {
                    name: "Ahmad",
                    rating: 8,
                    message: "Layanan yang sangat memuaskan dan profesional!",
                },
                {
                    name: "Siti",
                    rating: 9,
                    message: "Proses cepat dan hasilnya luar biasa.",
                },
                {
                    name: "Budi",
                    rating: 7,
                    message: "Kualitas baik, tetapi pengiriman agak lambat.",
                },
            ]);
        }
    }, []);

    // Dummy data untuk subkategori
    const subcategoryData = {
        name: "Tata Rias Pengantin",
        category: "Makeup & Kecantikan",
        description:
            "Layanan makeup profesional untuk pengantin dengan pengalaman lebih dari 10 tahun. Menggunakan produk premium dan tahan lama untuk hari spesial Anda.",
        services: [
            { name: "Paket Makeup Pengantin Basic", price: "Rp 2.500.000" },
            { name: "Paket Makeup Pengantin Premium", price: "Rp 4.500.000" },
        ],
        workers: [
            { name: "Sarah Amelia", rating: 4.8 },
            { name: "Linda Wijaya", rating: 4.9 },
            { name: "Nina Hartono", rating: 4.7 },
            { name: "Maria Chen", rating: 4.8 },
        ],
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
                        <div
                            key={index}
                            className="flex items-center justify-between border rounded-md p-4"
                        >
                            <div className="flex-1">
                                <span className="font-medium">{service.name}</span>
                                <span className="ml-4 text-gray-600">{service.price}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Workers */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Pekerja</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {subcategoryData.workers.map((worker, index) => (
                            <div
                                key={index}
                                className="border rounded-md p-3 text-center space-y-2"
                            >
                                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto" />
                                <p className="font-medium">{worker.name}</p>
                                <div className="flex items-center justify-center text-yellow-500">
                                    <Star size={16} fill="currentColor" />
                                    <span className="ml-1">{worker.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Join Button */}
                <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700">
                    Bergabung
                </button>

                {/* Testimonials */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Testimoni Pelanggan</h3>
                    <div className="space-y-6">
                        {testimonis.length > 0 ? (
                            testimonis.map((testimoni, index) => (
                                <div key={index} className="border p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <FaUserCircle className="text-indigo-500 text-3xl mr-4" />
                                        <span className="font-semibold text-gray-800">
                                            {testimoni.name}
                                        </span>
                                        <div className="flex ml-4">
                                            {[...Array(10)].map((_, i) => {
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
        </div>
    );
};

export default SubCategoryDetail;
