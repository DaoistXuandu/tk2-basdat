import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { FaUserCircle, FaStar, FaRegStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { fetchSubcategoryDetails } from "./controller/hijau";
import { useCookies } from "react-cookie";

const SubCategoryDetail = () => {
    const { id } = useParams(); // Ambil ID subkategori dari URL
    const [cookies] = useCookies(["role"]); // Gunakan cookie untuk mendapatkan role
    const [subcategory, setSubcategory] = useState(null); // Detail subkategori
    const [testimonis, setTestimonis] = useState([]); // Data testimoni
    const [loading, setLoading] = useState(true); // Status loading
    const [error, setError] = useState(null); // Status error

    const isWorker = cookies.role === "pekerja"; // Periksa apakah role adalah pekerja

    useEffect(() => {
        // Fetch data subkategori dari backend
        const fetchData = async () => {
            try {
                const data = await fetchSubcategoryDetails(id);
                setSubcategory(data);
                setTestimonis(data.testimonis || []);
            } catch (error) {
                setError("Gagal memuat data subkategori.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 mt-16">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                {/* Header Section */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={subcategory.name}
                        className="border rounded-md p-2"
                        readOnly
                    />
                    <input
                        type="text"
                        value={subcategory.category}
                        className="border rounded-md p-2"
                        readOnly
                    />
                </div>

                {/* Description */}
                <textarea
                    value={subcategory.description}
                    className="w-full border rounded-md p-3 h-24"
                    readOnly
                />

                {/* Service Sessions */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Pilihan Sesi Layanan</h3>
                    {subcategory.services.map((service, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between border rounded-md p-4"
                        >
                            <div className="flex-1">
                                <span className="font-medium">{service.name}</span>
                                <span className="ml-4 text-gray-600">
                                    Rp {service.price.toLocaleString("id-ID")}
                                </span>
                            </div>
                            {!isWorker && (
                                <a
                                    href={`${window.location.href}/form`}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Pesan
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {/* Workers */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Pekerja</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {subcategory.workers.map((worker, index) => (
                            <div
                                onClick={() => (window.location.href = `/profilPekerja/${worker.id}`)}
                                key={index}
                                className="cursor-pointer border rounded-md p-3 text-center space-y-2"
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

                {/* Button Join (Only for Workers) */}
                {isWorker && (
                    <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700">
                        Bergabung
                    </button>
                )}

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
